import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin, Client, User } from "./user.entity";
import { CreateAdminDto } from "./dtos/create-admin.dto";
import { Repository } from "typeorm";
import { UserCreateDto, UserDto, UserLoginDto } from "./dtos/user.dto";
import { RegisterDto } from "../auth/interface/register.dto";
import * as bcrypt from "bcrypt";
import {plainToInstance} from "class-transformer";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(admin);
  }


  async findClientById(id: number): Promise<UserDto> {
    const user  = await this.userRepository.findOne({
      where: { id },
    });
    return plainToInstance(UserDto, user, { excludeExtraneousValues: true });
  }

  async findAllAdmins(): Promise<UserDto[]> {
    const admins = await this.adminRepository.find();
    return plainToInstance(UserDto, admins, { excludeExtraneousValues: true });
  }

  async findAllClients(): Promise<UserDto[]> {
    const clients = await this.clientRepository.find();
    return plainToInstance(UserDto, clients, { excludeExtraneousValues: true });
  }



  async createClient(userCreateDto: UserCreateDto): Promise<RegisterDto> {

    if (
      !userCreateDto.firstName ||
      !userCreateDto.lastName ||
      !userCreateDto.email ||
      !userCreateDto.password
    ) {
      throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
    }

    if (!this.validateEmail(userCreateDto.email)) {
      throw new HttpException("Invalid email format", HttpStatus.BAD_REQUEST);
    }

    const existingClient = await this.clientRepository.findOne({
      where: { email: userCreateDto.email },
    });

    if (existingClient) {
      throw new HttpException("User Already Exists", HttpStatus.CONFLICT);
    }

    const client = this.clientRepository.create({
      firstName: userCreateDto.firstName,
      lastName: userCreateDto.lastName,
      email: userCreateDto.email,
      password: userCreateDto.password,
    });

    await this.clientRepository.save(client);
    return {
      message: "User registration successful",
    };
  }

  async findByLogin(userLoginDto: UserLoginDto): Promise<User> {
    if (!this.validateEmail(userLoginDto.email)) {
      throw new HttpException("Invalid email format", HttpStatus.BAD_REQUEST);
    }

    const user = await this.userRepository.findOne({
      where: { email: userLoginDto.email }
    });

    if (!user)
      throw new HttpException("User not found", HttpStatus.BAD_REQUEST);

    const areEqual = await bcrypt.compare(userLoginDto.password, user.password);
    if (!areEqual)
      throw new HttpException("Wrong Password", HttpStatus.BAD_REQUEST);

    return user;
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {id},
      relations: [],
    });

    if (!user) throw new HttpException("User not Found", HttpStatus.NOT_FOUND);
    return user;
  }


}
