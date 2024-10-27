package com.minho.backend.api.source.adapter.mail;

import com.minho.backend.api.source.domain.entity.Mail;
import com.minho.backend.api.source.domain.port.SourceMailPort;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Properties;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Store;
import javax.mail.internet.MimeMessage;
import javax.mail.search.SearchTerm;
import javax.mail.search.SentDateTerm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

// https://javaee.github.io/javamail/docs/api/
@RequiredArgsConstructor
@Component
public class SourceMailAdapter implements SourceMailPort {

    @Override
    public List<Mail> fetchEmail(String email, String password) {
        Properties properties = new Properties();
        properties.put("mail.store.protocol", "imaps");
        List<Mail> mails = new ArrayList<>();

        try {
            Session emailSession = Session.getDefaultInstance(properties);

            Store store = emailSession.getStore("imaps");

            store.connect("imap.gmail.com", email, password);

            Folder emailFolder = store.getFolder("INBOX");
            emailFolder.open(Folder.READ_ONLY);

            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DAY_OF_MONTH, -1);
            Date oneDayAgo = cal.getTime();

            SearchTerm searchTerm = new SentDateTerm(SentDateTerm.GE, oneDayAgo);
            Message[] messages = emailFolder.search(searchTerm);

            // Message[] messages = emailFolder.getMessages();
            for (Message message : messages) {
                if (message instanceof MimeMessage) {
                    MimeMessage mimeMessage = (MimeMessage) message;
                    System.out.println("Subject: " + mimeMessage.getSubject());
                    System.out.println("From: " + mimeMessage.getFrom()[0]);
                    System.out.println("Date: " + mimeMessage.getSentDate());
                    System.out.println("Content: " + mimeMessage.getContent());
                    System.out.println("------------------------------------------");

                    Mail mail = Mail.builder()
                        .subject(mimeMessage.getSubject())
                        // .content((String) mimeMessage.getContent())
                        .build();

                    mails.add(mail);
                }
            }

            emailFolder.close(false);
            store.close();
        }
        catch (Exception e) {
            System.out.println("@@@ error");
            System.out.println(e.getMessage());
            e.printStackTrace();
            // Email error
        }

        return mails;
    }

    // private final UserJpaRepository userRepository;

    // @Override
    // public Optional<User> findUserById(Long id) {
    // Optional<UserJpaEntity> userJpaEntity = this.userRepository.findById(id);
    // return userJpaEntity.map(jpaEntity -> jpaEntity.toEntity());
    // }

}
