package at.friedrichbachinger.mainappfcb.aspects;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.service.JwtUserDetailsService;
import at.friedrichbachinger.mainappfcb.service.UserService;

@Aspect
@Component
public class UpdateUserModfiedDate {

    @Autowired
    UserService userService;

    @Autowired
    JwtUserDetailsService userDetailsService;

    @Autowired
    UserRepository userRepository;

    @Pointcut("execution(* at.friedrichbachinger.mainappfcb.rest.*.addUser**(..))"
            + " || execution(* at.friedrichbachinger.mainappfcb.rest.*.updateUser**(..))"
            + " || execution(* at.friedrichbachinger.mainappfcb.rest.*.deleteUser**(..))"
            + " || execution(* at.friedrichbachinger.mainappfcb.rest.*.updateManyUser**(..))")
    public void applicationRestController() {
    }

    @After("applicationRestController()")
    public void loggingRest(JoinPoint joinPoint) throws Exception {
        if (joinPoint.getArgs().length > 0 && joinPoint.getArgs()[0].toString().contains("Bearer")) {
            String bearer = joinPoint.getArgs()[0].toString();
            UserDetails userDetails = userDetailsService.loadUserByBearer(bearer);
            UserDAO user = userService.getUser(userDetails);
            userService.updateLastModfiedDate(user);
            userRepository.save(user);
        }
    }
}