import React from 'react';
import { BarChart2, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const shortDate = (isoDate) => {
  const d = new Date(`${isoDate}T00:00:00Z`);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
};

const ChartCard = ({ title, icon: Icon, children, isEmpty, emptyMessage }) => (
  <div className="bg-surface-primary rounded-2xl border border-border-default shadow-sm p-5 flex flex-col h-full">
    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border-default">
      <div className="p-1.5 bg-surface-secondary text-text-muted rounded-lg"><Icon size={16} /></div>
      <h3 className="font-bold text-text-heading text-sm">{title}</h3>
    </div>
    {/* Plain h-64, no flex-1: as a flex item in ChartCard's column layout, flex-1's
        flex-basis: 0% would win over height and collapse this to ~0px, which silently
        breaks recharts' ResponsiveContainer (it measures 0 and renders no SVG at all). */}
    <div className="h-64 w-full shrink-0">
      {isEmpty ? (
        <div className="h-full w-full flex items-center justify-center text-sm text-text-muted">{emptyMessage}</div>
      ) : (
        children
      )}
    </div>
  </div>
);

// Last-14-day series returned by GET /analytics/trends, each row: { date: 'YYYY-MM-DD', value }
const ProductivityTrendChart = ({ series }) => {
  const hasData = series.some((d) => d.value != null);
  return (
    <ChartCard title="Productivity Trend" icon={TrendingUp} isEmpty={!hasData} emptyMessage="Rate a few journal entries to see your productivity trend.">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={series} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
          <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
          <YAxis domain={[0, 10]} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
          <Tooltip labelFormatter={shortDate} formatter={(v) => [v == null ? 'No entry' : v, 'Productivity (1-10)']} />
          <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={2} dot={false} connectNulls />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

const TimeAllocationChart = ({ focusMinutes, meetingMinutes }) => {
  const slices = [
    { name: 'Focus time', value: focusMinutes, color: '#6366f1' },
    { name: 'Meetings', value: meetingMinutes, color: '#f59e0b' }
  ].filter((s) => s.value > 0);

  return (
    <ChartCard title="Time Allocation" icon={PieChartIcon} isEmpty={slices.length === 0} emptyMessage="Schedule some focus blocks or meetings to see this breakdown.">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={slices} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2}>
            {slices.map((s) => (
              <Cell key={s.name} fill={s.color} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${Math.round(v / 60)}h ${v % 60}m`} />
          <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

const TaskCompletionVelocityChart = ({ series }) => {
  const hasData = series.some((d) => d.value > 0);
  return (
    <ChartCard title="Task Completion Velocity" icon={BarChart2} isEmpty={!hasData} emptyMessage="Complete some tasks to see your daily velocity.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={series} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
          <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
          <Tooltip labelFormatter={shortDate} formatter={(v) => [v, 'Tasks completed']} />
          <Bar dataKey="value" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

const HabitConsistencyChart = ({ series }) => {
  const hasData = series.some((d) => d.value > 0);
  return (
    <ChartCard title="Habit Consistency" icon={TrendingUp} isEmpty={!hasData} emptyMessage="Check off a habit to see your consistency here.">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={series} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-default)" />
          <XAxis dataKey="date" tickFormatter={shortDate} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: 'var(--color-text-muted)' }} />
          <Tooltip labelFormatter={shortDate} formatter={(v) => [v, 'Habits completed']} />
          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export const AnalyticsCharts = ({ data, trends }) => {
  const taskSeries = trends?.taskCompletions ?? [];
  const habitSeries = trends?.habitCompletions ?? [];
  const productivitySeries = trends?.journalProductivity ?? [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <ProductivityTrendChart series={productivitySeries} />
      <TimeAllocationChart focusMinutes={data?.calendar?.focusTime || 0} meetingMinutes={data?.calendar?.meetingTime || 0} />
      <TaskCompletionVelocityChart series={taskSeries} />
      <HabitConsistencyChart series={habitSeries} />
    </div>
  );
};
