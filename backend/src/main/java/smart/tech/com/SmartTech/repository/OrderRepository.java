package smart.tech.com.SmartTech.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import smart.tech.com.SmartTech.model.domain.Order;
import smart.tech.com.SmartTech.model.domain.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order,Long> {

    List<Order> findByUser(User user);
}
