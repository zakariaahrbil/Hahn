package org.example.taski.repositories;

import org.example.taski.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo
        extends JpaRepository<User, Long>
{
    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}
