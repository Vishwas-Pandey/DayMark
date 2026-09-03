export const contextSelector = {
  select: (finalContext, mode) => {
    // mode: FULL_CONTEXT, DASHBOARD_CONTEXT, PLANNING_CONTEXT, REFLECTION_CONTEXT, FOCUS_CONTEXT, JOURNAL_CONTEXT
    
    if (mode === 'FULL_CONTEXT') return finalContext;
    
    const subset = {
      user: finalContext.user,
      mode,
      timestamp: finalContext.timestamp
    };
    
    if (mode === 'DASHBOARD_CONTEXT') {
      subset.analytics = finalContext.analytics;
      subset.todayWork = finalContext.timeline.present;
    }
    
    if (mode === 'PLANNING_CONTEXT') {
      subset.upcomingWork = finalContext.timeline.upcoming;
      subset.goals = finalContext.goals;
    }
    
    if (mode === 'REFLECTION_CONTEXT' || mode === 'JOURNAL_CONTEXT') {
      subset.journal = finalContext.journal;
      subset.past = finalContext.timeline.past;
    }
    
    if (mode === 'FOCUS_CONTEXT') {
      subset.todayWork = finalContext.timeline.present;
      subset.tasks = finalContext.tasks.filter(t => t._ranking?.priorityScore > 50);
    }
    
    return subset;
  }
};
