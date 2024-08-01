import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CatxService } from './catx.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guards';
import { CreateCatxDto } from './dto/create.catx.dto';
import { Catx } from './catx.entity';
import { UpdateCatxDto } from './dto/update.catx.dto';

@Controller('catx')
export class CatxController {
  constructor(private catxService: CatxService) {}

  //   @UseGuards(JwtAuthGuard)
  //   @Post('create')
  //   createCatx(
  //     @Body() createCatxDto: CreateCatxDto,
  //     @Request() { user }: any,
  //   ): Promise<Catx> {

  //     return this.catxService.createCatx({}, user);
  //   }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createCatx(
    @Body() createCatxDto: CreateCatxDto,
    @Request() { user }: any,
  ): Promise<Catx> {
    return this.catxService.createCatx(createCatxDto.description, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getCatxsByUserId(@Param('userId') userId: string): Promise<Catx[]> {
    return this.catxService.getCatxsByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteCatxById(
    @Param('id') id: string,
    @Request() { user }: any,
  ): Promise<void> {
    return this.catxService.deleteCatxById(id, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateCatx(
    @Param('id') id: string,
    @Request() { user }: any,
    @Body() updateCatxDto: UpdateCatxDto,
  ): Promise<Catx> {
    return this.catxService.updateCatx(id, user.id, updateCatxDto);
  }
}
