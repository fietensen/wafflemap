package de.fietensen.wafflemap.service;

import de.fietensen.wafflemap.dto.RoadDistDTO;
import de.fietensen.wafflemap.dto.RoadEdgeDTO;
import de.fietensen.wafflemap.dto.RoadResultDTO;
import de.fietensen.wafflemap.dto.RoadResultsDTO;
import de.fietensen.wafflemap.model.RoadEdge;
import de.fietensen.wafflemap.repository.RoadEdgeRepository;
import de.fietensen.wafflemap.repository.RoadSearchRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
public class RoadService {
    private final ModelMapper modelMapper;
    private final RoadSearchRepository roadSearchRepository;
    private final RoadEdgeRepository roadEdgeRepository;

    @Autowired
    public RoadService(ModelMapper modelMapper, RoadSearchRepository roadSearchRepository, RoadEdgeRepository roadEdgeRepository) {
        this.modelMapper = modelMapper;
        this.roadSearchRepository = roadSearchRepository;
        this.roadEdgeRepository = roadEdgeRepository;
    }

    public RoadEdgeDTO getEdgeById(Long id) {
        Optional<RoadEdge> edge = roadEdgeRepository.findById(id);
        if (edge.isEmpty())
            return null;

        return modelMapper.map(edge, RoadEdgeDTO.class);
    }

    public RoadResultsDTO findRoadByName(String baseUrl,
                                         String nameParam,
                                         Long skipParam,
                                         Long limitParam) {
        long skip;
        long limit;

        if (skipParam == null) {
            skip = 0;
        } else {
            skip = Math.abs(skipParam);
        }

        if (limitParam == null || limitParam > 50) {
            limit = 50;
        } else {
            limit = Math.abs(limitParam);
        }

        List<Object[]> results = roadSearchRepository.findRoadsByName(nameParam, limit, skip);
        List<RoadResultDTO> resultsMapped = new LinkedList<>();

        for (Object[] object : results) {
            RoadResultDTO mapped = new RoadResultDTO();
            mapped.setName((String) object[0]);
            mapped.setLat((Double) object[1]);
            mapped.setLon((Double) object[2]);
            resultsMapped.add(mapped);
        }

        RoadResultsDTO roadResultDTO = new RoadResultsDTO();
        roadResultDTO.setResults(resultsMapped);

        // set next link if all "limit" entities have been returned
        if (resultsMapped.size() < limit) {
            return roadResultDTO;
        }

        roadResultDTO.setNext(baseUrl + String.format(
                "?name=%s&skip=%d&limit=%d",
                nameParam,
                skip + resultsMapped.size(),
                limit));

        return roadResultDTO;
    }

    public RoadDistDTO findRoadByLocation(Double lat, Double lon) {
        RoadDistDTO roadDistDTO = new RoadDistDTO();
        List<Object[]> roadDistsRaw = roadSearchRepository.findClosestNodes(lat, lon, 1L, 0L);
        if (roadDistsRaw.isEmpty())
            return null;

        roadDistDTO.setId((Long) roadDistsRaw.get(0)[0]);
        roadDistDTO.setLon((Double) roadDistsRaw.get(0)[1]);
        roadDistDTO.setLat((Double) roadDistsRaw.get(0)[2]);
        roadDistDTO.setDistance((Double) roadDistsRaw.get(0)[3]);

        return roadDistDTO;
    }
}
