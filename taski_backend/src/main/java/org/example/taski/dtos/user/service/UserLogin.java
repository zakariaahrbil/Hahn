package org.example.taski.dtos.user.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLogin
{
    private Long id;
    private String username;
    private String email;
    private String token;
}
