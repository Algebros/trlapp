import { Board } from "../common/models";
import { BoardInstance, IBoard } from "../../interface";
import ApiError from "../../error/ApiError";
import express from "express";

async function createBoard(boardData: IBoard, res: express.Response): Promise<BoardInstance> {
  const { UserId } = res.locals.decode;
  const {title, background} = boardData;

  if (!title || !background) {
    throw ApiError.badRequest("title or background not entered");
  }
  
  const board = await Board.create({title, background, UserId});

  return board;
}

async function getAllBoards(res: express.Response): Promise<Array<BoardInstance>> {
  const { UserId } = res.locals.decode;
  
  const board = await Board.findAll({ 
    where: {
      UserId
    } 
  })

  return board;
}

async function update(boardData: IBoard): Promise<[affectedCount: number]> {
  return await Board.update(boardData, {
    where: {
      id: boardData.id,
    },
  });
}

async function remove(boardData: IBoard): Promise<number> {
  return await Board.destroy({
    where: {
      id: boardData.id,
    },
  });
}

export { createBoard, getAllBoards, update, remove };
