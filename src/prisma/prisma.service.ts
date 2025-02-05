import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Connected to the database');
      // this.$extends({
      //   query: {
      //     product: {
      //       create: ({ args, query }) => {
      //         console.log('Interceptando create', args.data);
      //         if (args.data.name) {
      //           args.data = {
      //             ...args.data,
      //             slug: slugify(args.data.name, { lower: true, strict: true }),
      //           };
      //         }
      //         return query(args);
      //       },
      //       update: ({ args, query }) => {
      //         if (args.data && typeof args.data.name === 'string') {
      //           args.data.slug = { set: slugify(args.data.name, { lower: true }) };
      //         }
      //         return query(args);
      //       },
      //     },
      //   },
      // });
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
}
