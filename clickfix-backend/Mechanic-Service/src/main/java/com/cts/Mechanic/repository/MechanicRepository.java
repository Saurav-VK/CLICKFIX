package com.cts.Mechanic.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.cts.Mechanic.entity.Mechanic;

 
@Repository
public interface MechanicRepository extends JpaRepository<Mechanic , Integer> {

	List<Mechanic> findByServiceCenterId(int serviceCenterId);
}
