import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'

// @Entities()
// export class User {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     name: string;

//     @Column()
//     email: string;

//     @Column()
//     password: string;

//     @OneToMany(type => Tweet, tweet => tweet.user)
//     tweets: Tweet[];
// }

// @Entities()
// export class Tweet {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     content: string;

//     @ManyToOne(type => User, user => user.tweets)
//     user: User;

//     @OneToMany(type => Like, like => like.tweet)
//     likes: Like[];

//     @OneToMany(type => Comment, comment => comment.tweet)
//     comments: Comment[];
// }

// @Entities()
// export class Like {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @ManyToOne(type => Tweet, tweet => tweet.likes)
//     tweet: Tweet;

//     @ManyToOne(type => User, user => user.likes)
//     user: User;
// }

// @Entities()
// export class Comment {
//     @PrimaryGeneratedColumn()
//     id: number;

//     @Column()
//     content: string;

//     @ManyToOne(type => Tweet, tweet => tweet.comments)
//     tweet: Tweet;

//     @ManyToOne(type => User, user => user.comments)
//     user: User;
// }


// import { 
//     Entity, 
//     PrimaryGeneratedColumn, 
//     Column, 
//     OneToMany, 
//     ManyToOne 
// } from 'typeorm';

// class IUser {
//     name: string;
//     email: string;
//     password: string;
//     constructor(name: string, email: string, password: string) {
//         this.name = name;
//         this.email = email;
//         this.password = password;
//     }
// }

// class ITweet {
//     content: string;
//     user: User;
//     constructor(content: string, user: User) {
//         this.content = content;
//         this.user = user;
//     }
// }

// class ILike {
//     tweet: Tweet;
//     user: User;
//     constructor(tweet: Tweet, user: User) {
//         this.tweet = tweet;
//         this.user = user;
//     }
// }

// class IComment {
//     content: string;
//     tweet: Tweet;
//     user: User;
//     constructor(content: string, tweet: Tweet, user: User) {
//         this.content = content;
//         this.tweet = tweet;
//         this.user = user;
//     }
// }

// export { User, Tweet, Like, Comment };

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
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
    content!: string;

    @ManyToOne(type => User, user => user.tweets)
    user!: User;

    @OneToMany(type => Like, like => like.tweet)
    likes!: Like[];

    @OneToMany(type => Comment, comments => comments.tweet)
    comments!: Comment[];
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
    content!: string;

    @ManyToOne(type => Tweet, tweet => tweet.comments)
    tweet!: Tweet;

    @ManyToOne(type => User, user => user.comments)
    user!: User;
}
