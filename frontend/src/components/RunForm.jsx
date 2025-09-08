import { useState } from 'react';

export default function RunForm() {
  const [form, setForm] = useState({
    tasks: 'all',
    n: 1,
    ks: '1,5,10',
    model: '',
    temperature: 0.8,
    top_p: 1,
    max_tokens: 128,
    seed: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder POST
    alert('Run submitted: ' + JSON.stringify(form));
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>New Evaluation Run</h2>
      <label>Tasks
        <input name="tasks" value={form.tasks} onChange={handleChange} />
      </label>
      <label>n
        <input name="n" type="number" value={form.n} onChange={handleChange} />
      </label>
      <label>k list
        <input name="ks" value={form.ks} onChange={handleChange} />
      </label>
      <label>model_name
        <input name="model" value={form.model} onChange={handleChange} />
      </label>
      <button type="submit">Start Evaluation</button>
    </form>
  );
}
