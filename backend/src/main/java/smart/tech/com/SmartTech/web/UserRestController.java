package smart.tech.com.SmartTech.web;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import smart.tech.com.SmartTech.model.DTO.EditUserDTO;
import smart.tech.com.SmartTech.model.DTO.LoginResponseDTO;
import smart.tech.com.SmartTech.model.DTO.UserDTO;
import smart.tech.com.SmartTech.model.domain.User;
import smart.tech.com.SmartTech.model.domain.VerificationToken;
import smart.tech.com.SmartTech.model.exceptions.AccountNotVerifiedException;
import smart.tech.com.SmartTech.model.exceptions.InvalidCredentialsException;
import smart.tech.com.SmartTech.repository.UserRepository;
import smart.tech.com.SmartTech.repository.VerificationTokenRepository;
import smart.tech.com.SmartTech.services.interfaces.UserService;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;


@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/users")
public class UserRestController {

    private final UserService userService;
    private final VerificationTokenRepository verificationTokenRepository;
    private final UserRepository userRepository;

    public UserRestController(UserService userService, VerificationTokenRepository verificationTokenRepository, UserRepository userRepository) {
        this.userService = userService;
        this.verificationTokenRepository = verificationTokenRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserDTO userDTO) {
        return userService.register(userDTO)
                .map(user -> ResponseEntity.ok().body(user))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
        try {
            return userService.createToken(userDTO)
                    .map(ResponseEntity::ok)
                    .orElseThrow(InvalidCredentialsException::new);
        } catch (AccountNotVerifiedException e) {
            // враќаме status 403 и message
            return ResponseEntity
                    .status(403)
                    .body(Map.of("message", "Account not verified! Please check your email."));
        } catch (InvalidCredentialsException e) {
            // враќаме status 401 и message
            return ResponseEntity
                    .status(401)
                    .body(Map.of("message", "Invalid username or password."));
        }
    }

    @PutMapping("/edit/{username}")
    public ResponseEntity<User> editUser(@PathVariable String username, @RequestBody UserDTO userDTO) {
        return userService.editUser(username, userDTO)
                .map(user -> ResponseEntity.ok().body(user))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/edit/info")
    public ResponseEntity<EditUserDTO> getInfoForEditUser(Authentication authentication) {
        String username = authentication.getName(); // зема од SecurityContext
        return userService.findUserInfoForEdit(username)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/confirm")
    public void confirm(@RequestParam String token, HttpServletResponse response) throws IOException {
        VerificationToken verificationToken =
                verificationTokenRepository.findByToken(token)
                        .orElseThrow(() -> new RuntimeException("Invalid token"));

        if(verificationToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Token expired");
        }

        User user = verificationToken.getUser();
        user.setEnabled(true);
        userRepository.save(user);

        verificationTokenRepository.delete(verificationToken);

        // Redirect на React login page
        response.sendRedirect("http://localhost:3000/login?verified=true");;
    }

}
