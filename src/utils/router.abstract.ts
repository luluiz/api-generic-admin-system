import express, { Router } from 'express';

export abstract class RouterAbstract {
    abstract getRouter(): Router;
}
