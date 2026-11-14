import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  CalendarDays, Check, CheckCheck, Circle, ClipboardList, Clock3, Filter,
  ListTodo, Plus, Search, Sparkles, Tag, Trash2, Pencil, X, ChevronDown
} from "lucide-react";

type Category = "Work" | "Personal" | "Study" | "Health";
type Task = {
  id: string;
  title: string;
  description: string;
  category: Category;
  dueDate: string;
  completed: boolean;
  createdAt: number;
};

const STORAGE_KEY = "datheon-task-manager-v1";
const categories: Category[] = ["Work", "Personal", "Study", "Health"];

function readTasks(): Task[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) as Task[] : [];
  } catch {
    return [];
  }
}

function dateLabel(value: string) {
  if (!value) return "No due date";
  return new Date(value + "T00:00:00").toLocaleDateString(undefined, {
    month: "short", day: "numeric"
  });
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(readTasks);
  const [filter, setFilter] = useState("All tasks");
  const [categoryFilter, setCategoryFilter] = useState("All categories");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("Work");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const today = new Date().toISOString().slice(0, 10);
  const overdueCount = tasks.filter((task) => !task.completed && task.dueDate && task.dueDate < today).length;

  const visibleTasks = useMemo(() => tasks.filter((task) => {
    const matchesFilter =
      filter === "All tasks" ||
      (filter === "Today" && task.dueDate === today) ||
      (filter === "Upcoming" && task.dueDate > today && !task.completed) ||
      (filter === "Completed" && task.completed) ||
      (filter === "Pending" && !task.completed);
    const matchesCategory = categoryFilter === "All categories" || task.category === categoryFilter;
    const query = search.trim().toLowerCase();
    const matchesSearch = !query || task.title.toLowerCase().includes(query) || task.description.toLowerCase().includes(query);
    return matchesFilter && matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (a.completed !== b.completed) return Number(a.completed) - Number(b.completed);
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return a.dueDate.localeCompare(b.dueDate);
  }), [tasks, filter, categoryFilter, search, today]);

  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory("Work");
    setDueDate("");
    setEditingId(null);
    setShowForm(false);
  }

  function openEdit(task: Task) {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setCategory(task.category);
    setDueDate(task.dueDate);
    setShowForm(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim()) return;
    if (editingId) {
      setTasks((current) => current.map((task) => task.id === editingId
        ? { ...task, title: title.trim(), description: description.trim(), category, dueDate }
        : task));
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        title: title.trim(),
        description: description.trim(),
        category,
        dueDate,
        completed: false,
        createdAt: Date.now()
      };
      setTasks((current) => [newTask, ...current]);
    }
    resetForm();
  }

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  const navItems = [
    { label: "All tasks", icon: ListTodo, count: tasks.length },
    { label: "Today", icon: CalendarDays },
    { label: "Upcoming", icon: Clock3 },
    { label: "Completed", icon: CheckCheck, count: completedCount },
    { label: "Pending", icon: Circle, count: pendingCount }
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Taskflow home">
          <span className="brand-mark"><CheckCheck size={21} /></span>
          <span>taskflow<span className="brand-dot">.</span></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Task filters">
          {navItems.map(({ label, icon: Icon, count }) => (
            <button key={label} className={filter === label ? "nav-item active" : "nav-item"} onClick={() => setFilter(label)}>
              <Icon size={18} strokeWidth={1.9} />
              <span>{label}</span>
              {count !== undefined && <span className="nav-count">{count}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="mini-card">
            <span className="mini-icon"><Sparkles size={16} /></span>
            <strong>Make room for focus.</strong>
            <p>Small steps add up to big progress.</p>
          </div>
          <div className="profile">
            <div className="avatar">IA</div>
            <div><strong>My workspace</strong><span>Personal account</span></div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{filter}</strong></div>
          <div className="topbar-right"><span className="today-label">{new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</span><div className="avatar small">IA</div></div>
        </header>

        <section className="page-heading">
          <div>
            <div className="eyebrow"><Sparkles size={14} /> YOUR PRODUCTIVITY SPACE</div>
            <h1>{filter === "All tasks" ? "Good things get done." : filter}</h1>
            <p>Plan your day, keep your priorities clear, and make progress one task at a time.</p>
          </div>
          <button className="primary-button" onClick={() => { resetForm(); setShowForm(true); }}><Plus size={18} /> Add a task</button>
        </section>

        <section className="stats-grid" aria-label="Task overview">
          <div className="stat-card"><div className="stat-top"><span>Total tasks</span><span className="stat-icon violet"><ClipboardList size={18} /></span></div><strong>{tasks.length}</strong><small>Across your workspace</small></div>
          <div className="stat-card"><div className="stat-top"><span>Completed</span><span className="stat-icon green"><Check size={18} /></span></div><strong>{completedCount}</strong><small>{tasks.length ? Math.round(completedCount / tasks.length * 100) : 0}% of all tasks</small></div>
          <div className="stat-card"><div className="stat-top"><span>In progress</span><span className="stat-icon blue"><Clock3 size={18} /></span></div><strong>{pendingCount}</strong><small>Still on your list</small></div>
          <div className="stat-card"><div className="stat-top"><span>Overdue</span><span className="stat-icon orange"><CalendarDays size={18} /></span></div><strong>{overdueCount}</strong><small>Past their due date</small></div>
        </section>

        <section className="task-panel">
          <div className="panel-heading">
            <div><h2>My tasks</h2><p>{visibleTasks.length} {visibleTasks.length === 1 ? "task" : "tasks"} shown</p></div>
            <div className="filters">
              <label className="search-box"><Search size={17} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks..." /></label>
              <label className="select-box"><Filter size={16} /><select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}><option>All categories</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label>
            </div>
          </div>

          {showForm && (
            <form className="task-form" onSubmit={handleSubmit}>
              <div className="form-heading"><div><strong>{editingId ? "Edit task" : "Create a task"}</strong><span>Give your next action a clear name.</span></div><button type="button" className="icon-button" onClick={resetForm} aria-label="Close form"><X size={18} /></button></div>
              <div className="form-grid">
                <label className="field full">Task title<input autoFocus value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Finish project documentation" required maxLength={90} /></label>
                <label className="field full">Description <textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Add a few details (optional)" rows={2} maxLength={240} /></label>
                <label className="field">Category<select value={category} onChange={(event) => setCategory(event.target.value as Category)}>{categories.map((item) => <option key={item}>{item}</option>)}</select></label>
                <label className="field">Due date<input type="date" value={dueDate} onChange={(event) => setDueDate(event.target.value)} /></label>
              </div>
              <div className="form-actions"><button type="button" className="secondary-button" onClick={resetForm}>Cancel</button><button className="primary-button" type="submit">{editingId ? "Save changes" : "Create task"}</button></div>
            </form>
          )}

          {visibleTasks.length ? (
            <div className="task-list">
              {visibleTasks.map((task) => (
                <article className={task.completed ? "task-row completed" : "task-row"} key={task.id}>
                  <button className={task.completed ? "check-button checked" : "check-button"} onClick={() => toggleTask(task.id)} aria-label={task.completed ? "Mark as pending" : "Mark as completed"}>{task.completed && <Check size={15} />}</button>
                  <div className="task-details"><div className="task-title-line"><h3>{task.title}</h3><span className={"category-pill " + task.category.toLowerCase()}><Tag size={11} />{task.category}</span></div>{task.description && <p>{task.description}</p>}<div className="task-meta"><span className={task.dueDate && !task.completed && task.dueDate < today ? "due-date overdue" : "due-date"}><CalendarDays size={13} />{dateLabel(task.dueDate)}</span><span className="created-label">Added {new Date(task.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span></div></div>
                  <div className="task-actions"><button className="icon-button" onClick={() => openEdit(task)} aria-label="Edit task"><Pencil size={16} /></button><button className="icon-button delete-button" onClick={() => deleteTask(task.id)} aria-label="Delete task"><Trash2 size={16} /></button></div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state"><span className="empty-icon"><ClipboardList size={25} /></span><h3>{search || filter !== "All tasks" || categoryFilter !== "All categories" ? "No matching tasks" : "Your list is clear"}</h3><p>{search || filter !== "All tasks" || categoryFilter !== "All categories" ? "Try adjusting your filters or search." : "Add your first task and start building momentum."}</p>{!search && filter === "All tasks" && categoryFilter === "All categories" && <button className="secondary-button" onClick={() => setShowForm(true)}><Plus size={16} /> Create your first task</button>}</div>
          )}
          <div className="panel-footer"><span><span className="live-dot" /> Saved automatically on this device</span><button onClick={() => { setFilter("All tasks"); setCategoryFilter("All categories"); setSearch(""); }}>Clear filters</button></div>
        </section>
        <footer className="app-footer">TASKFLOW <span>•</span> DATHEON INTERNSHIP PROJECT 02</footer>
      </main>
    </div>
  );
}

export default App;