package at.friedrichbachinger.mainappfcb.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
@ComponentScan("at.friedrichbachinger.mainappfcb")
public class AspectConfig {
}