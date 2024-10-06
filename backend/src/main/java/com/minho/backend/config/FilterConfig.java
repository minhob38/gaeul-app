package com.minho.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@Configuration
public class FilterConfig implements WebMvcConfigurer {

    // @Override
    // public void addInterceptors(InterceptorRegistry registry) {
    // registry.addInterceptor(new LogInterceptor()).order(1).addPathPatterns("/**");
    // }
    //
    // @Bean
    // public FilterRegistrationBean authCheckFilter() {
    // FilterRegistrationBean<Filter> filterRegistrationBean = new
    // FilterRegistrationBean<>();
    // filterRegistrationBean.setFilter(new AuthCheckFilter());
    // filterRegistrationBean.setOrder(1);
    // filterRegistrationBean.addUrlPatterns("/*");
    // return filterRegistrationBean;
    // }

}