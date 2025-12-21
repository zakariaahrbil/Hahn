package org.example.taski.repositories;


import org.example.taski.entities.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepo
        extends JpaRepository<Project, Long>
{
    Optional<Project> findByIdAndUserId(Long projectId, Long userId);
    Page<Project> findAllByUserId(Long userId, Pageable pageable);
    @Query("SELECT p FROM Project p WHERE p.user.id = :userId AND (p.title LIKE %:query% OR p.description LIKE %:query%)")
    Page<Project> searchByTitleOrDescriptionAndUserId(@Param("query") String query, @Param("userId") Long userId, Pageable pageable);


}
