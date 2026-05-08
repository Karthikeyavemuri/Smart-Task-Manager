package com.taskmanager.dto;

import java.util.List;
import java.util.Map;

public class AnalyticsDTO {
    private int totalTasks;
    private Map<String, Long> statusCounts;
    private double completionRate;
    private List<String> highPriorityPending;

    public AnalyticsDTO(int totalTasks, Map<String, Long> statusCounts, double completionRate, List<String> highPriorityPending) {
        this.totalTasks = totalTasks;
        this.statusCounts = statusCounts;
        this.completionRate = completionRate;
        this.highPriorityPending = highPriorityPending;
    }

    public int getTotalTasks() { return totalTasks; }
    public void setTotalTasks(int totalTasks) { this.totalTasks = totalTasks; }

    public Map<String, Long> getStatusCounts() { return statusCounts; }
    public void setStatusCounts(Map<String, Long> statusCounts) { this.statusCounts = statusCounts; }

    public double getCompletionRate() { return completionRate; }
    public void setCompletionRate(double completionRate) { this.completionRate = completionRate; }

    public List<String> getHighPriorityPending() { return highPriorityPending; }
    public void setHighPriorityPending(List<String> highPriorityPending) { this.highPriorityPending = highPriorityPending; }
}
