package smart.tech.com.SmartTech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smart.tech.com.SmartTech.model.domain.VerificationToken;

import java.util.Optional;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {

    Optional<VerificationToken> findByToken(String token);
}
