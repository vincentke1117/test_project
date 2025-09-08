import { BrowserRouter, Routes, Route, Link, useParams } from 'react-router-dom';
import RunForm from './components/RunForm';
import RunProgress from './components/RunProgress';
import RunSummary from './components/RunSummary';
import TaskViewer from './components/TaskViewer';
import CompareView from './components/CompareView';

function TaskPage() {
  const { id, taskId } = useParams();
  return <TaskViewer taskId={taskId} runId={id} />;
}

function ProgressPage() {
  const { id } = useParams();
  return <RunProgress runId={id} />;
}

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/run/new">New Run</Link> | <Link to="/compare">Compare</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>Dataset overview and recent runs.</div>} />
        <Route path="/run/new" element={<RunForm />} />
        <Route path="/run/:id/progress" element={<ProgressPage />} />
        <Route path="/run/:id" element={<RunSummary />} />
        <Route path="/run/:id/task/:taskId" element={<TaskPage />} />
        <Route path="/compare" element={<CompareView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
