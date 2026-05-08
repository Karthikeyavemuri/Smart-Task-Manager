package com.taskmanager.service;

import com.taskmanager.dto.AnalyticsDTO;
import com.taskmanager.model.Task;
import com.taskmanager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public AnalyticsDTO getTaskAnalytics(Long userId) {
        List<Task> allTasks = taskRepository.findByUserId(userId);
        int totalTasks = allTasks.size();

        // Calculate counts for each status
        Map<String, Long> statusCounts = allTasks.stream()
                .collect(Collectors.groupingBy(Task::getStatus, Collectors.counting()));
        
        // Ensure keys exist even if zero
        statusCounts.putIfAbsent("Completed", 0L);
        statusCounts.putIfAbsent("In Progress", 0L);
        statusCounts.putIfAbsent("Pending", 0L);

        // Calculate completion rate
        long completedCount = statusCounts.get("Completed");
        double completionRate = totalTasks > 0 ? ((double) completedCount / totalTasks) * 100 : 0.0;

        // Get high priority pending tasks
        List<String> highPriorityPending = allTasks.stream()
                .filter(task -> "High".equalsIgnoreCase(task.getPriority()) && !"Completed".equalsIgnoreCase(task.getStatus()))
                .map(Task::getTitle)
                .collect(Collectors.toList());

        return new AnalyticsDTO(totalTasks, statusCounts, completionRate, highPriorityPending);
    }
}
