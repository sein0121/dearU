package com.dearu.backend.service;

import com.dearu.backend.model.Clsf;
import com.dearu.backend.model.Invitation;
import com.dearu.backend.repository.ClsfRepository;
import com.dearu.backend.repository.InvitationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.ReflectionUtils;
import org.springframework.stereotype.Service;


import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class InvitationService {

    @Autowired
    private InvitationRepository invitationRepository;
    @Autowired
    private ClsfRepository clsfRepository;

    public List<Invitation> getAllInvitations(){
        return invitationRepository.findAllByOrderByScheduleDesc();
    }

    public Invitation saveInvitation(Invitation invitation) {

        String title = invitation.getClsf();
        Clsf clsf_title = clsfRepository.findByTitle(title);
        if(clsf_title != null) {
            String clsfCode = clsf_title.getCode() ;
            invitation.setClsf(clsfCode);
//            System.out.println("✅ 가져온 clsf code: " + clsfCode);
        }
        else {
            String clsfNullCode = "" ;
            invitation.setClsf(clsfNullCode);
//            throw new IllegalArgumentException("해당 초대장 종류가 존재하지 않습니다.");
        }


        return invitationRepository.save(invitation);
    }

    public Invitation updateInvitation(String id, Map<String, Object> updates) {
        Optional<Invitation> optionalInvitation = invitationRepository.findById(id);

        if (optionalInvitation.isPresent()) {
            Invitation invitation = optionalInvitation.get();

            updates.forEach((key, value) -> {
                Field field = ReflectionUtils.findField(Invitation.class, key);
                if (field != null) {
                    field.setAccessible(true);

                    // ✅ schedule 필드인 경우 LocalDateTime으로 변환
                    if (key.equals("schedule") && value instanceof String) {
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
                        LocalDateTime dateTimeValue = LocalDateTime.parse((String) value, formatter);
                        ReflectionUtils.setField(field, invitation, dateTimeValue);
                    } else if (key.equals("clsf")&& value instanceof String) {
                        String title = (String) value;
                        Clsf clsf_title = clsfRepository.findByTitle(title);
                        if (clsf_title != null) {
                            String clsfCode = clsf_title.getCode() ;
                            invitation.setClsf(clsfCode);
                        }else {
                            invitation.setClsf("" ) ;
                        }
                    } else {
                        ReflectionUtils.setField(field, invitation, value);
                    }
                }
            });

            return invitationRepository.save(invitation);
        } else {
            throw new RuntimeException("Invitation not found");
        }
    }

}
