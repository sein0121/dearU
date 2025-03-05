package com.dearu.backend.controller;

import com.dearu.backend.dto.UserDTO;
import com.dearu.backend.model.User;
import com.dearu.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    // 회원가입
    @PostMapping("/register")
    public String register(@RequestBody UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(userDTO.getPassword());
        userService.register(user);
        return "회원가입 성공!";
    }

    // 로그인
    @PostMapping("/login")
    public String login(@RequestBody UserDTO userDTO) {
        boolean isAuthenticated = userService.login(userDTO.getUsername(), userDTO.getPassword());
        return isAuthenticated ? "로그인 성공!" : "로그인 실패!";
    }
}
