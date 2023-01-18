import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import {
    Contains,
    IsInt,
    Length,
    IsEmail,
    IsFQDN,
    IsDate,
    Min,
    Max,
} from "class-validator"
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(10, 20)
    name!: string;

    @Column()
    @IsEmail()
    email!: string;

    @Column()
    @Length(6, 20)
    password!: string;

    @Column()
    isVerified!: boolean;

    @OneToMany(type => Tweet, tweet => tweet.user)
    tweets!: Tweet[];

    @OneToMany(type => Like, like => like.user)
    likes!: Like[];

    @OneToMany(type => Comment, comments => comments.user)
    comments!: Comment[];

}

@Entity()
export class Tweet {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(10, 20)
    content!: string;

    @ManyToOne(type => User, user => user.tweets)
    user!: User;

    @OneToMany(type => Like, like => like.tweet)
    likes!: Like[];

    @OneToMany(type => Comment, comments => comments.tweet)
    comments!: Comment[];

    // constructor(){
    //     this.id = 0;
    //     this.content = '';
    //     this.user = new User();
    //     this.likes = [];
    //     this.comments = [];

    // }
}

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(type => Tweet, tweet => tweet.likes)
    tweet!: Tweet;

    @ManyToOne(type => User, user => user.likes)
    user!: User;
}

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @Length(10, 20)
    content!: string;

    @ManyToOne(type => Tweet, tweet => tweet.comments)
    tweet!: Tweet;

    @ManyToOne(type => User, user => user.comments)
    user!: User;
}
