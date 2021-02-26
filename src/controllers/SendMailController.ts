import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body; 

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);
        
        const userAlreadyExists = await usersRepository.findOne({email});

        if(!userAlreadyExists) {
            return response.status(400).json({
                error: "User does not exists",
            });
        }

        const surveysAlreadyExists = await surveysRepository.findOne({id: survey_id})

        if (!surveysAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exists!"
            })
        }

        // Salvar as informações na tabela surveyUser
        
        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser)

        // Enviar e-mail para o usuário

        return response.json(surveyUser);
    }

}

export { SendMailController };