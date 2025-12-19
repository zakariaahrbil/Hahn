package repositories;


import entities.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepo
        extends JpaRepository<Project, Long>
{
    Optional<Project> findByIdAndUserId(Long projectId, Long userId);
    Page<Project> findAllByUserId(Long userId, Pageable pageable);


}
