package org.example.taski.dtos.user.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class GetMeResponse
{
    private Long id;
    private String username;
    private String email;
}
