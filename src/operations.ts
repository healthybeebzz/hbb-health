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

/**
 * Fetches records from the table and maps them to DTO (data transfer objects).
 * @param pool
 * @param userId
 */
export const fetchRecords = async (pool: Pool, userId: number) => {
    const {rows} = await pool.query(`SELECT * FROM hbb_health.records WHERE user_id=${userId}`);

    if (rows[0] === undefined) throw new Error(`The records with the id: ${userId} do not exist.`);

    return {
        id: rows[0].id,
        userId: rows[0].user_id,
        childhoodDisease: rows[0].childhood_disease,
        majorAdultDisease: rows[0].major_adult_disease,
        surgeries: rows[0].surgeries,
        priorInjuries: rows[0].prior_injuries,
        medications: rows[0].medications,
        allergies: rows[0].allergies,
    }
}