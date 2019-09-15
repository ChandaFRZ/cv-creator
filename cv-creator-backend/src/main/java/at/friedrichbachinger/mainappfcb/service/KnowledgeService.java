package at.friedrichbachinger.mainappfcb.service;

import java.util.Set;

import org.springframework.security.core.userdetails.UserDetails;

import at.friedrichbachinger.mainappfcb.entity.elements.Knowledge;

public interface KnowledgeService {

    public Set<Knowledge> getUserKnowledges(UserDetails userDetails);

    public Knowledge addUserKnowledge(UserDetails userDetails, Knowledge knowledgeBox);

    public Knowledge updateUserKnowledgeById(UserDetails userDetails, int id, Knowledge knowledgeBox);

    public boolean deleteUserKnowledgeById(UserDetails userDetails, int id);

    public boolean updateManyUserKnowledges(UserDetails userDetails, Set<Knowledge> knowledgeBoxes);
}