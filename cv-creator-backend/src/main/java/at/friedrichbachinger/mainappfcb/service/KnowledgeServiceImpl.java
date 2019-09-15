package at.friedrichbachinger.mainappfcb.service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import at.friedrichbachinger.mainappfcb.dao.KnowledgeRepository;
import at.friedrichbachinger.mainappfcb.dao.UserRepository;
import at.friedrichbachinger.mainappfcb.entity.UserDAO;
import at.friedrichbachinger.mainappfcb.entity.elements.Knowledge;
import at.friedrichbachinger.mainappfcb.rest.exceptions.KnowledgeAlreadyExistsException;
import at.friedrichbachinger.mainappfcb.rest.exceptions.KnowledgeNotFoundException;

@Service
public class KnowledgeServiceImpl implements KnowledgeService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private KnowledgeRepository knowldegeRepository;

    @Autowired
    public KnowledgeServiceImpl() {
    }

    @Override
    public Set<Knowledge> getUserKnowledges(UserDetails userDetails) {
        UserDAO user = userService.getUser(userDetails);
        return user.getKnowledges();
    }

    @Override
    public Knowledge addUserKnowledge(UserDetails userDetails, Knowledge knowledge) {
        UserDAO user = userService.getUser(userDetails);

        findKnowledgeByEqualPosition(knowledge, user);
        knowledge.setId(0);

        Knowledge addKnowledge = knowldegeRepository.save(knowledge);
        user.getKnowledges().add(addKnowledge);
        userRepository.save(user);
        return addKnowledge;
    }

    @Override
    public Knowledge updateUserKnowledgeById(UserDetails userDetails, int id, Knowledge knowledge) {
        UserDAO user = userService.getUser(userDetails);
        Knowledge foundKnowledge = knowldegeRepository.getOne(id);
        if (foundKnowledge == null) {
            throw new KnowledgeNotFoundException("Knowledge not found!");
        }

        Knowledge updatedKnowledge = knowldegeRepository.save(knowledge);
        user.getKnowledges().add(updatedKnowledge);
        userRepository.save(user);
        return updatedKnowledge;
    }

    @Override
    public boolean deleteUserKnowledgeById(UserDetails userDetails, int id) {
        UserDAO user = userService.getUser(userDetails);
        Knowledge deleteKnowledge = knowldegeRepository.getOne(id);
        if (deleteKnowledge == null) {
            throw new KnowledgeNotFoundException("Knowledge not found!");
        }

        user.getKnowledges().remove(deleteKnowledge);
        knowldegeRepository.deleteById(deleteKnowledge.getId());
        userRepository.save(user);
        return true;
    }

    @Override
    public boolean updateManyUserKnowledges(UserDetails userDetails, Set<Knowledge> knowledges) {
        if (knowledges.size() <= 0) {
            throw new KnowledgeNotFoundException("Knowledge not found!");
        }

        UserDAO user = userService.getUser(userDetails);
        user.setKnowledges(knowledges);
        userRepository.save(user);
        return true;
    }

    private void findKnowledgeByEqualPosition(Knowledge knowledge, UserDAO user) {
        List<Knowledge> boxes = user.getKnowledges().stream()
                .filter(data -> data.getType() == knowledge.getType() && data.getPosition() == knowledge.getPosition())
                .map(data -> new Knowledge(data)).collect(Collectors.toList());

        if (boxes.size() > 0) {
            throw new KnowledgeAlreadyExistsException("Knowledge Box already exists!");
        }
    }
}