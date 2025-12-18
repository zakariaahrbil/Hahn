package org.example.taski;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class TaskiBackendApplication
{

    public static void main(String[] args)
    {
        SpringApplication.run(TaskiBackendApplication.class, args);
    }
}
