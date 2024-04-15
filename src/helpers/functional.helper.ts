import {HttpStatus} from "@nestjs/common";
import {Sort} from "src/enums";

export const isMatching = (value = null, target = null, status = HttpStatus.BAD_REQUEST, message = 'Dữ liệu không hợp lệ') => (data) => {
}

export const getSortType = (type: string): string => type == Sort.Asc ? 'ASC' : 'DESC';

