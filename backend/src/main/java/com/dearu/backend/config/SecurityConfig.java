package com.dearu.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()  // CSRF 비활성화
                .authorizeHttpRequests()
                .requestMatchers("/api/users/**", "/api/invitations/**").permitAll()  // 사용자, 초대장 API는 인증 없이 접근 허용
                .anyRequest().authenticated()
                .and()
                .formLogin().disable(); // 기본 로그인 폼 비활성화
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
