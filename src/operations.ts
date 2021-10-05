import {Pool} from 'pg';

export const insertOperation = async (pool: Pool, operation: MedicalOperation) => {
    const {childhoodDisease, majorAdultDisease, surgeries, priorInjuries, medications, allergies} = operation;

    await pool.query(`
                INSERT INTO hbb_health.records(childhood_disease, major_adult_disease, surgeries, prior_injuries, medications, allergies)
                VALUES ('${childhoodDisease}', '${majorAdultDisease}', '${surgeries}', '${priorInjuries}', '${medications}', '${allergies}')`);
}

export type MedicalOperation = {
    childhoodDisease: string,
    majorAdultDisease: string,
    surgeries: string,
    priorInjuries: string,
    medications: string,
    allergies: string,
}

