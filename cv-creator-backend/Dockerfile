FROM openjdk:8-jdk-alpine

VOLUME /tmp

COPY target/cv-generator-backend-0.0.1-SNAPSHOT.jar cv-generator-backend-0.0.1-SNAPSHOT.jar

# CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-jar", "cv-generator-backend-0.0.1-SNAPSHOT.jar"]

# ENTRYPOINT [ "sh", "-c", "java $JAVA_OPTS -Djava.security.egd=file:/dev/./urandom -XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -jar /cv-generator-backend-0.0.1-SNAPSHOT.jar" ]

CMD [ "java", "-Djava.security.egd=file:/dev/./urandom", "-XX:+UnlockExperimentalVMOptions", "-XX:+UseCGroupMemoryLimitForHeap", "-jar", "cv-generator-backend-0.0.1-SNAPSHOT.jar" ]