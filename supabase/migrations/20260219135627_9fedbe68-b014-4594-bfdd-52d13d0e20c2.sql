
-- Create role enum
CREATE TYPE public.app_role AS ENUM ('student', 'teacher');

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checks
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own role on signup"
  ON public.user_roles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  syllabus_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone authenticated can view courses"
  ON public.courses FOR SELECT TO authenticated USING (true);
CREATE POLICY "Teachers can create courses"
  ON public.courses FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'teacher') AND auth.uid() = teacher_id);
CREATE POLICY "Teachers can update own courses"
  ON public.courses FOR UPDATE TO authenticated
  USING (auth.uid() = teacher_id);
CREATE POLICY "Teachers can delete own courses"
  ON public.courses FOR DELETE TO authenticated
  USING (auth.uid() = teacher_id);

-- Assignments table
CREATE TABLE public.assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  rubric_json JSONB,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard')),
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view assignments"
  ON public.assignments FOR SELECT TO authenticated USING (true);
CREATE POLICY "Teachers can create assignments"
  ON public.assignments FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = course_id AND courses.teacher_id = auth.uid()
    )
  );
CREATE POLICY "Teachers can update assignments"
  ON public.assignments FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = course_id AND courses.teacher_id = auth.uid()
    )
  );
CREATE POLICY "Teachers can delete assignments"
  ON public.assignments FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.courses
      WHERE courses.id = course_id AND courses.teacher_id = auth.uid()
    )
  );

-- Submissions table
CREATE TABLE public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content_text TEXT,
  file_url TEXT,
  score NUMERIC,
  ai_feedback JSONB,
  plagiarism_score NUMERIC DEFAULT 0,
  status TEXT CHECK (status IN ('draft', 'submitted', 'graded', 'returned')) DEFAULT 'draft',
  submitted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own submissions"
  ON public.submissions FOR SELECT TO authenticated
  USING (
    auth.uid() = student_id
    OR EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON c.id = a.course_id
      WHERE a.id = assignment_id AND c.teacher_id = auth.uid()
    )
  );
CREATE POLICY "Students can create submissions"
  ON public.submissions FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Students can update own draft submissions"
  ON public.submissions FOR UPDATE TO authenticated
  USING (auth.uid() = student_id AND status = 'draft');
-- Teachers can update submissions (for grading)
CREATE POLICY "Teachers can update submissions for grading"
  ON public.submissions FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON c.id = a.course_id
      WHERE a.id = assignment_id AND c.teacher_id = auth.uid()
    )
  );

-- Extension requests
CREATE TABLE public.extension_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reason TEXT NOT NULL,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  new_due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.extension_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view own extension requests"
  ON public.extension_requests FOR SELECT TO authenticated
  USING (auth.uid() = student_id);
CREATE POLICY "Teachers can view extension requests"
  ON public.extension_requests FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.submissions s
      JOIN public.assignments a ON a.id = s.assignment_id
      JOIN public.courses c ON c.id = a.course_id
      WHERE s.id = submission_id AND c.teacher_id = auth.uid()
    )
  );
CREATE POLICY "Students can create extension requests"
  ON public.extension_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Teachers can update extension requests"
  ON public.extension_requests FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.submissions s
      JOIN public.assignments a ON a.id = s.assignment_id
      JOIN public.courses c ON c.id = a.course_id
      WHERE s.id = submission_id AND c.teacher_id = auth.uid()
    )
  );

-- Groups table
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  assignment_id UUID REFERENCES public.assignments(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  student_ids UUID[] NOT NULL,
  strength TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view groups"
  ON public.groups FOR SELECT TO authenticated USING (true);
CREATE POLICY "Teachers can manage groups"
  ON public.groups FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON c.id = a.course_id
      WHERE a.id = assignment_id AND c.teacher_id = auth.uid()
    )
  );
CREATE POLICY "Teachers can update groups"
  ON public.groups FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON c.id = a.course_id
      WHERE a.id = assignment_id AND c.teacher_id = auth.uid()
    )
  );
CREATE POLICY "Teachers can delete groups"
  ON public.groups FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.assignments a
      JOIN public.courses c ON c.id = a.course_id
      WHERE a.id = assignment_id AND c.teacher_id = auth.uid()
    )
  );

-- Auto-create profile on signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON public.assignments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON public.submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('submissions', 'submissions', false);
INSERT INTO storage.buckets (id, name, public) VALUES ('syllabi', 'syllabi', false);

CREATE POLICY "Students can upload submissions"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'submissions' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can view own submission files"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'submissions' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Teachers can upload syllabi"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'syllabi' AND public.has_role(auth.uid(), 'teacher'));
CREATE POLICY "Authenticated can view syllabi"
  ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'syllabi');
