import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@strticket/common';
import { User } from '../models/user';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .isLength({ min: 4, max: 20 })
        .withMessage('Password must be between 4 and 20 characters')
    ], 
    validateRequest,
    async (req: Request, res: Response) => {
        // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //     throw new RequestValidationError(errors.array());
    // } else {
        const { email, password } = req.body;
        
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // console.log('Email in use');
            // res.send({});
            // return;
            throw new BadRequestError('Email in use');
        } else {
            const user = User.build({ email, password});
            await user.save();

            // Generate JWT
            // if(!process.env.JWT_KEY) {
            //     throw new Error('JWT_KEY is not defined');
            // }

            const userJwt = jwt.sign(
                {
                    id: user.id,
                    email: user.email
                }, 
                process.env.JWT_KEY!
            );

            // Store it on session object
            req.session =  {
                jwt: userJwt
            };

            res.status(201).send(user);
        }
    // }
    
})

export { router as signupRouter };