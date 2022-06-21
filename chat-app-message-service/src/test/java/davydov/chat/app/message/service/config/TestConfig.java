package davydov.chat.app.message.service.config;

import com.zaxxer.hikari.HikariDataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
@Profile("test")
public class TestConfig {

    @Primary
    @Bean
    public DataSource dataSource() {
        return DataSourceBuilder
                .create()
                .type(HikariDataSource.class)
                .driverClassName("org.h2.Driver")
                .url("jdbc:h2:mem:db;DB_CLOSE_DELAY=-1")
                .username("sa")
                .password("sa")
                .build();
    }
}
