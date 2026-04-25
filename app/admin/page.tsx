"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  Edit3,
  Eye,
  EyeOff,
  Lock,
  LogOut,
  Plus,
  Save,
  Trash2,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "/api";
const TOKEN_KEY = "juan-dev-admin-token";

type AdminUser = { id: number; name: string; email: string };
type TopProject = { slug: string; title: string; views: number };
type Metrics = {
  total_visits: number;
  total_project_views: number;
  top_projects: TopProject[];
};

type AdminProject = {
  id: number;
  slug: string;
  title: string;
  description: string;
  category: string;
  client: string | null;
  technologies: string[];
  platforms: string[];
  images: string[];
  github_url: string | null;
  github_private: boolean;
  demo_url: string | null;
  demo_private: boolean;
  demo_soon: boolean;
  featured: boolean;
  status: "draft" | "published" | "archived";
  year: number | null;
  sort_order: number;
  updated_at?: string;
};

type AdminCertificate = {
  id: number;
  title: string;
  issuer: string;
  issued_label: string | null;
  category: string | null;
  highlight: string | null;
  image: string | null;
  credential_url: string | null;
  status: "draft" | "published" | "archived";
  sort_order: number;
  updated_at?: string;
};

type ProjectForm = Omit<AdminProject, "id" | "updated_at"> & {
  image_file?: File | null;
};
type CertificateForm = Omit<AdminCertificate, "id" | "updated_at"> & {
  image_file?: File | null;
};

const emptyProject: ProjectForm = {
  slug: "",
  title: "",
  description: "",
  category: "Web",
  client: "",
  technologies: ["React"],
  platforms: [],
  images: [],
  github_url: "",
  github_private: true,
  demo_url: "",
  demo_private: true,
  demo_soon: false,
  featured: false,
  status: "published",
  year: new Date().getFullYear(),
  sort_order: 0,
  image_file: null,
};

const emptyCertificate: CertificateForm = {
  title: "",
  issuer: "",
  issued_label: "",
  category: "Curso",
  highlight: "",
  image: "",
  credential_url: "",
  status: "published",
  sort_order: 0,
  image_file: null,
};

async function adminFetch<T>(
  path: string,
  token: string,
  init: RequestInit = {},
): Promise<T> {
  const isFormData = init.body instanceof FormData;
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(init.headers ?? {}),
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.message || `Error ${response.status}`);
  }

  return (await response.json()) as T;
}

function asList(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function listText(value: string[]): string {
  return value.join(", ");
}

function appendFormValue(formData: FormData, key: string, value: unknown) {
  if (value === null || value === undefined) return;
  if (typeof value === "boolean") formData.append(key, value ? "1" : "0");
  else if (Array.isArray(value)) formData.append(key, JSON.stringify(value));
  else formData.append(key, String(value));
}

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [email, setEmail] = useState("admin@juan-dev.app-dev.icu");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [certificates, setCertificates] = useState<AdminCertificate[]>([]);
  const [editingProject, setEditingProject] = useState<number | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<number | null>(
    null,
  );
  const [projectForm, setProjectForm] = useState<ProjectForm>(emptyProject);
  const [certificateForm, setCertificateForm] =
    useState<CertificateForm>(emptyCertificate);
  const [message, setMessage] = useState("");

  const projectStats = useMemo(
    () => ({
      total: projects.length,
      published: projects.filter((project) => project.status === "published")
        .length,
    }),
    [projects],
  );

  useEffect(() => {
    const storedToken = window.localStorage.getItem(TOKEN_KEY);
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!token) return;

    adminFetch<{ user: AdminUser }>("/admin/me", token)
      .then((payload) => {
        setUser(payload.user);
        loadDashboard(token);
      })
      .catch(() => {
        window.localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
      });
  }, [token]);

  const loadDashboard = async (authToken = token) => {
    if (!authToken) return;

    const [metricsData, projectsData, certificatesData] = await Promise.all([
      adminFetch<Metrics>("/admin/metrics", authToken),
      adminFetch<{ projects: AdminProject[] }>("/admin/projects", authToken),
      adminFetch<{ certificates: AdminCertificate[] }>(
        "/admin/certificates",
        authToken,
      ),
    ]);

    setMetrics(metricsData);
    setProjects(projectsData.projects);
    setCertificates(certificatesData.certificates);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setLoginError("");

    try {
      const response = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const payload = await response.json();
      if (!response.ok)
        throw new Error(payload?.message || "No se pudo iniciar sesión");

      window.localStorage.setItem(TOKEN_KEY, payload.token);
      setToken(payload.token);
      setUser(payload.user);
      setPassword("");
    } catch (error) {
      setLoginError(
        error instanceof Error ? error.message : "Error de autenticación",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    if (token)
      await adminFetch("/admin/logout", token, { method: "POST" }).catch(
        () => null,
      );
    window.localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const submitProject = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;

    const formData = new FormData();
    Object.entries(projectForm).forEach(([key, value]) => {
      if (key !== "image_file") appendFormValue(formData, key, value);
    });
    if (projectForm.image_file)
      formData.append("image_file", projectForm.image_file);

    const path = editingProject
      ? `/admin/projects/${editingProject}`
      : "/admin/projects";
    if (editingProject) formData.append("_method", "PUT");

    await adminFetch(path, token, { method: "POST", body: formData });
    setMessage(editingProject ? "Proyecto actualizado" : "Proyecto creado");
    setProjectForm(emptyProject);
    setEditingProject(null);
    await loadDashboard();
  };

  const submitCertificate = async (event: FormEvent) => {
    event.preventDefault();
    if (!token) return;

    const formData = new FormData();
    Object.entries(certificateForm).forEach(([key, value]) => {
      if (key !== "image_file") appendFormValue(formData, key, value);
    });
    if (certificateForm.image_file)
      formData.append("image_file", certificateForm.image_file);

    const path = editingCertificate
      ? `/admin/certificates/${editingCertificate}`
      : "/admin/certificates";
    if (editingCertificate) formData.append("_method", "PUT");

    await adminFetch(path, token, { method: "POST", body: formData });
    setMessage(
      editingCertificate ? "Certificado actualizado" : "Certificado creado",
    );
    setCertificateForm(emptyCertificate);
    setEditingCertificate(null);
    await loadDashboard();
  };

  const deleteProject = async (project: AdminProject) => {
    if (!token || !window.confirm(`Eliminar proyecto ${project.title}?`))
      return;
    await adminFetch(`/admin/projects/${project.id}`, token, {
      method: "DELETE",
    });
    await loadDashboard();
  };

  const deleteCertificate = async (certificate: AdminCertificate) => {
    if (!token || !window.confirm(`Eliminar certificado ${certificate.title}?`))
      return;
    await adminFetch(`/admin/certificates/${certificate.id}`, token, {
      method: "DELETE",
    });
    await loadDashboard();
  };

  if (!token || !user) {
    return (
      <main className="min-h-screen bg-black/95 px-4 py-16 text-white">
        <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-md items-center">
          <Card className="w-full border-[#00f0ff]/25 bg-black/80 text-white shadow-2xl shadow-[#00f0ff]/10 backdrop-blur-xl">
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-neon-blue">
                <Lock className="h-5 w-5" />
              </div>
              <CardTitle className="text-2xl tracking-normal">
                Admin Juan Dev
              </CardTitle>
              <p className="text-sm text-gray-400">
                Acceso privado para contenido y métricas.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo</Label>
                  <Input
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="border-[#00f0ff]/20 bg-black/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="border-[#00f0ff]/20 bg-black/60"
                  />
                </div>
                {loginError && (
                  <p className="rounded-lg border border-red-500/30 bg-red-500/15 px-3 py-2 text-sm text-red-200">
                    {loginError}
                  </p>
                )}
                <Button
                  disabled={isLoading}
                  className="w-full rounded-full bg-neon-blue text-black hover:bg-electric-green"
                >
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black/95 px-4 py-8 text-white">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 rounded-2xl border border-[#00f0ff]/20 bg-black/70 p-5 shadow-2xl shadow-[#00f0ff]/10 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-neon-blue">Panel privado</p>
            <h1 className="text-3xl font-bold tracking-normal">
              Administración Juan Dev
            </h1>
            <p className="text-sm text-gray-400">Sesión activa: {user.name}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => loadDashboard()}
              variant="outline"
              className="rounded-full border-[#00f0ff]/30 bg-transparent text-neon-blue hover:bg-[#00f0ff]/10"
            >
              Refrescar
            </Button>
            <Button
              onClick={logout}
              variant="outline"
              className="rounded-full border-red-500/30 bg-transparent text-red-200 hover:bg-red-500/10"
            >
              <LogOut className="mr-2 h-4 w-4" /> Salir
            </Button>
          </div>
        </header>

        {message && (
          <p className="rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            {message}
          </p>
        )}

        <section className="grid gap-4 md:grid-cols-4">
          <MetricCard label="Visitas" value={metrics?.total_visits ?? 0} />
          <MetricCard
            label="Vistas proyectos"
            value={metrics?.total_project_views ?? 0}
          />
          <MetricCard label="Proyectos" value={projectStats.total} />
          <MetricCard label="Publicados" value={projectStats.published} />
        </section>

        <Card className="border-[#00f0ff]/20 bg-black/70 text-white backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 tracking-normal">
              <BarChart3 className="h-5 w-5 text-neon-blue" /> Proyectos más
              vistos
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-5">
            {(metrics?.top_projects ?? []).length ? (
              metrics?.top_projects.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-xl border border-[#00f0ff]/15 bg-black/50 p-3"
                >
                  <p className="truncate text-sm font-semibold">
                    {project.title}
                  </p>
                  <p className="text-xs text-gray-400">
                    {project.views} vistas
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400">
                Aún no hay vistas de proyectos registradas.
              </p>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList className="border border-[#00f0ff]/20 bg-black/70">
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
          </TabsList>

          <TabsContent
            value="projects"
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]"
          >
            <ContentList
              title="Proyectos"
              items={projects}
              renderItem={(project) => (
                <ContentRow
                  key={project.id}
                  title={project.title}
                  subtitle={`${project.category} · ${project.year ?? "Sin año"}`}
                  status={project.status}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingProject(project.id);
                      setProjectForm({ ...project, image_file: null });
                    }}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteProject(project)}
                  >
                    <Trash2 className="h-4 w-4 text-red-300" />
                  </Button>
                </ContentRow>
              )}
            />
            <ProjectFormCard
              form={projectForm}
              editing={Boolean(editingProject)}
              setForm={setProjectForm}
              onCancel={() => {
                setEditingProject(null);
                setProjectForm(emptyProject);
              }}
              onSubmit={submitProject}
            />
          </TabsContent>

          <TabsContent
            value="certificates"
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]"
          >
            <ContentList
              title="Certificados"
              items={certificates}
              renderItem={(certificate) => (
                <ContentRow
                  key={certificate.id}
                  title={certificate.title}
                  subtitle={`${certificate.issuer} · ${certificate.issued_label ?? "Sin fecha"}`}
                  status={certificate.status}
                >
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingCertificate(certificate.id);
                      setCertificateForm({ ...certificate, image_file: null });
                    }}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => deleteCertificate(certificate)}
                  >
                    <Trash2 className="h-4 w-4 text-red-300" />
                  </Button>
                </ContentRow>
              )}
            />
            <CertificateFormCard
              form={certificateForm}
              editing={Boolean(editingCertificate)}
              setForm={setCertificateForm}
              onCancel={() => {
                setEditingCertificate(null);
                setCertificateForm(emptyCertificate);
              }}
              onSubmit={submitCertificate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

function MetricCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-[#00f0ff]/20 bg-black/70 p-4 shadow-lg shadow-[#00f0ff]/5">
      <p className="text-sm text-gray-400">{label}</p>
      <p className="mt-2 text-3xl font-bold text-neon-blue">{value}</p>
    </div>
  );
}

function ContentList<T>({
  title,
  items,
  renderItem,
}: {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}) {
  return (
    <Card className="border-[#00f0ff]/20 bg-black/70 text-white backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="tracking-normal">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{items.map(renderItem)}</CardContent>
    </Card>
  );
}

function ContentRow({
  title,
  subtitle,
  status,
  children,
}: {
  title: string;
  subtitle: string;
  status: string;
  children: React.ReactNode;
}) {
  const isPublished = status === "published";

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[#00f0ff]/15 bg-black/45 p-3">
      <div className="min-w-0">
        <p className="truncate font-semibold tracking-normal">{title}</p>
        <p className="truncate text-xs text-gray-400">{subtitle}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Badge
          className={cn(
            "border",
            isPublished
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
              : "border-yellow-500/30 bg-yellow-500/10 text-yellow-200",
          )}
        >
          {isPublished ? (
            <Eye className="mr-1 h-3 w-3" />
          ) : (
            <EyeOff className="mr-1 h-3 w-3" />
          )}
          {status}
        </Badge>
        {children}
      </div>
    </div>
  );
}

function ProjectFormCard({
  form,
  editing,
  setForm,
  onCancel,
  onSubmit,
}: {
  form: ProjectForm;
  editing: boolean;
  setForm: (form: ProjectForm) => void;
  onCancel: () => void;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <Card className="border-[#00f0ff]/20 bg-black/70 text-white backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 tracking-normal">
          <Plus className="h-5 w-5 text-neon-blue" />{" "}
          {editing ? "Editar proyecto" : "Nuevo proyecto"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <TextField
            label="Título"
            value={form.title}
            onChange={(value) => setForm({ ...form, title: value })}
          />
          <TextField
            label="Slug"
            value={form.slug}
            onChange={(value) => setForm({ ...form, slug: value })}
          />
          <TextareaField
            label="Descripción"
            value={form.description}
            onChange={(value) => setForm({ ...form, description: value })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Categoría"
              value={form.category}
              onChange={(value) => setForm({ ...form, category: value })}
            />
            <TextField
              label="Año"
              value={String(form.year ?? "")}
              onChange={(value) =>
                setForm({ ...form, year: value ? Number(value) : null })
              }
            />
          </div>
          <TextField
            label="Tecnologías"
            value={listText(form.technologies)}
            onChange={(value) =>
              setForm({ ...form, technologies: asList(value) })
            }
          />
          <TextField
            label="Plataformas"
            value={listText(form.platforms)}
            onChange={(value) => setForm({ ...form, platforms: asList(value) })}
          />
          <TextField
            label="Imagen URL"
            value={form.images[0] ?? ""}
            onChange={(value) =>
              setForm({ ...form, images: value ? [value] : [] })
            }
          />
          <FileField
            onChange={(file) => setForm({ ...form, image_file: file })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="GitHub URL"
              value={form.github_url ?? ""}
              onChange={(value) => setForm({ ...form, github_url: value })}
            />
            <TextField
              label="Demo URL"
              value={form.demo_url ?? ""}
              onChange={(value) => setForm({ ...form, demo_url: value })}
            />
          </div>
          <div className="grid gap-2 text-sm text-gray-300">
            <Toggle
              label="Publicado"
              checked={form.status === "published"}
              onChange={(checked) =>
                setForm({ ...form, status: checked ? "published" : "draft" })
              }
            />
            <Toggle
              label="Destacado"
              checked={form.featured}
              onChange={(checked) => setForm({ ...form, featured: checked })}
            />
            <Toggle
              label="GitHub privado"
              checked={form.github_private}
              onChange={(checked) =>
                setForm({ ...form, github_private: checked })
              }
            />
            <Toggle
              label="Demo privado"
              checked={form.demo_private}
              onChange={(checked) =>
                setForm({ ...form, demo_private: checked })
              }
            />
            <Toggle
              label="Demo pronto"
              checked={form.demo_soon}
              onChange={(checked) => setForm({ ...form, demo_soon: checked })}
            />
          </div>
          <FormActions editing={editing} onCancel={onCancel} />
        </form>
      </CardContent>
    </Card>
  );
}

function CertificateFormCard({
  form,
  editing,
  setForm,
  onCancel,
  onSubmit,
}: {
  form: CertificateForm;
  editing: boolean;
  setForm: (form: CertificateForm) => void;
  onCancel: () => void;
  onSubmit: (event: FormEvent) => void;
}) {
  return (
    <Card className="border-[#00f0ff]/20 bg-black/70 text-white backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 tracking-normal">
          <CheckCircle2 className="h-5 w-5 text-neon-blue" />{" "}
          {editing ? "Editar certificado" : "Nuevo certificado"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-4">
          <TextField
            label="Título"
            value={form.title}
            onChange={(value) => setForm({ ...form, title: value })}
          />
          <div className="grid gap-3 sm:grid-cols-2">
            <TextField
              label="Emisor"
              value={form.issuer}
              onChange={(value) => setForm({ ...form, issuer: value })}
            />
            <TextField
              label="Fecha"
              value={form.issued_label ?? ""}
              onChange={(value) => setForm({ ...form, issued_label: value })}
            />
          </div>
          <TextField
            label="Categoría"
            value={form.category ?? ""}
            onChange={(value) => setForm({ ...form, category: value })}
          />
          <TextField
            label="Highlight"
            value={form.highlight ?? ""}
            onChange={(value) => setForm({ ...form, highlight: value })}
          />
          <TextField
            label="Imagen URL"
            value={form.image ?? ""}
            onChange={(value) => setForm({ ...form, image: value })}
          />
          <FileField
            onChange={(file) => setForm({ ...form, image_file: file })}
          />
          <TextField
            label="URL credencial"
            value={form.credential_url ?? ""}
            onChange={(value) => setForm({ ...form, credential_url: value })}
          />
          <Toggle
            label="Publicado"
            checked={form.status === "published"}
            onChange={(checked) =>
              setForm({ ...form, status: checked ? "published" : "draft" })
            }
          />
          <FormActions editing={editing} onCancel={onCancel} />
        </form>
      </CardContent>
    </Card>
  );
}

function TextField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border-[#00f0ff]/20 bg-black/60"
      />
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="min-h-28 border-[#00f0ff]/20 bg-black/60"
      />
    </div>
  );
}

function FileField({ onChange }: { onChange: (file: File | null) => void }) {
  return (
    <div className="space-y-2">
      <Label className="flex items-center gap-2">
        <Upload className="h-4 w-4" />
        Subir imagen
      </Label>
      <Input
        type="file"
        accept="image/*"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        className="border-[#00f0ff]/20 bg-black/60"
      />
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-xl border border-[#00f0ff]/15 bg-black/45 px-3 py-2">
      <span>{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-cyan-400"
      />
    </label>
  );
}

function FormActions({
  editing,
  onCancel,
}: {
  editing: boolean;
  onCancel: () => void;
}) {
  return (
    <div className="flex gap-3">
      <Button className="flex-1 rounded-full bg-neon-blue text-black hover:bg-electric-green">
        <Save className="mr-2 h-4 w-4" />
        Guardar
      </Button>
      {editing && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="rounded-full border-[#00f0ff]/30 bg-transparent text-neon-blue hover:bg-[#00f0ff]/10"
        >
          Cancelar
        </Button>
      )}
    </div>
  );
}
