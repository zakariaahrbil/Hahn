package org.example.taski.config;

import lombok.RequiredArgsConstructor;
import org.example.taski.entities.Project;
import org.example.taski.entities.Task;
import org.example.taski.entities.TaskStateEnum;
import org.example.taski.entities.User;
import org.example.taski.repositories.ProjectRepo;
import org.example.taski.repositories.TaskRepo;
import org.example.taski.repositories.UserRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner
{

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;
    private final ProjectRepo projectRepo;
    private final TaskRepo taskRepo;

    @Override
    public void run(String... args) {

        if (!userRepo.existsByEmail("admin@taski.com")) {
            User admin = new User();
            admin.setEmail("admin@taski.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setUsername("admin");

            userRepo.save(admin);

            // Create sample projects and tasks for the admin user
            if (projectRepo.count() == 0) {
                // Project 1
                Project p1 = new Project();
                p1.setTitle("Project Alpha");
                p1.setDescription("First sample project for development.");
                p1.setUser(admin);
                projectRepo.save(p1);

                Task t1 = new Task();
                t1.setTitle("Task 1 for Alpha");
                t1.setDescription("Implement login functionality.");
                t1.setDeadline(LocalDateTime.now().plusDays(7));
                t1.setState(TaskStateEnum.NOT_COMPLETED);
                t1.setProject(p1);
                taskRepo.save(t1);

                Task t2 = new Task();
                t2.setTitle("Task 2 for Alpha");
                t2.setDescription("Design database schema.");
                t2.setDeadline(LocalDateTime.now().plusDays(10));
                t2.setState(TaskStateEnum.COMPLETED);
                t2.setProject(p1);
                taskRepo.save(t2);

                // Project 2
                Project p2 = new Project();
                p2.setTitle("Project Beta");
                p2.setDescription("Second sample project for testing.");
                p2.setUser(admin);
                projectRepo.save(p2);

                Task t3 = new Task();
                t3.setTitle("Task 1 for Beta");
                t3.setDescription("Write unit tests.");
                t3.setDeadline(LocalDateTime.now().plusDays(5));
                t3.setState(TaskStateEnum.NOT_COMPLETED);
                t3.setProject(p2);
                taskRepo.save(t3);

                Task t4 = new Task();
                t4.setTitle("Task 2 for Beta");
                t4.setDescription("Integrate with external API.");
                t4.setDeadline(LocalDateTime.now().plusDays(14));
                t4.setState(TaskStateEnum.NOT_COMPLETED);
                t4.setProject(p2);
                taskRepo.save(t4);

                // Project 3
                Project p3 = new Project();
                p3.setTitle("Project Gamma");
                p3.setDescription("Third sample project for deployment.");
                p3.setUser(admin);
                projectRepo.save(p3);

                Task t5 = new Task();
                t5.setTitle("Task 1 for Gamma");
                t5.setDescription("Set up CI/CD pipeline.");
                t5.setDeadline(LocalDateTime.now().plusDays(3));
                t5.setState(TaskStateEnum.COMPLETED);
                t5.setProject(p3);
                taskRepo.save(t5);

                Task t6 = new Task();
                t6.setTitle("Task 2 for Gamma");
                t6.setDescription("Deploy to production.");
                t6.setDeadline(LocalDateTime.now().plusDays(20));
                t6.setState(TaskStateEnum.NOT_COMPLETED);
                t6.setProject(p3);
                taskRepo.save(t6);

                // Project 4
                Project p4 = new Project();
                p4.setTitle("Project Delta");
                p4.setDescription("Fourth sample project for maintenance.");
                p4.setUser(admin);
                projectRepo.save(p4);

                Task t7 = new Task();
                t7.setTitle("Task 1 for Delta");
                t7.setDescription("Fix bugs in existing code.");
                t7.setDeadline(LocalDateTime.now().plusDays(2));
                t7.setState(TaskStateEnum.NOT_COMPLETED);
                t7.setProject(p4);
                taskRepo.save(t7);

                // Project 5
                Project p5 = new Project();
                p5.setTitle("Project Epsilon");
                p5.setDescription("Fifth sample project for research.");
                p5.setUser(admin);
                projectRepo.save(p5);

                Task t8 = new Task();
                t8.setTitle("Task 1 for Epsilon");
                t8.setDescription("Research new technologies.");
                t8.setDeadline(LocalDateTime.now().plusDays(30));
                t8.setState(TaskStateEnum.NOT_COMPLETED);
                t8.setProject(p5);
                taskRepo.save(t8);

                Task t9 = new Task();
                t9.setTitle("Task 2 for Epsilon");
                t9.setDescription("Document findings.");
                t9.setDeadline(LocalDateTime.now().plusDays(25));
                t9.setState(TaskStateEnum.COMPLETED);
                t9.setProject(p5);
                taskRepo.save(t9);
            }
        }
    }
}
