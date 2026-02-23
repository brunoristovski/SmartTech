package smart.tech.com.SmartTech.model.exceptions;

public class AccountNotVerifiedException extends RuntimeException {
    public AccountNotVerifiedException() {
        super("Account not verified yet!");
    }
}
