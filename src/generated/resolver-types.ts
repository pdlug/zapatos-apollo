/* eslint-disable */
/* AUTO GENERATED, DO NOT EDIT */
import { GraphQLResolveInfo } from 'graphql';
import { Context } from '../graphql/types';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** A user */
export type User = {
  __typename?: 'User';
  /** Primary identifier */
  id: Scalars['ID'];
  /** Email address */
  email: Scalars['String'];
  /** Name */
  name: Scalars['String'];
};

/** A item containing some content */
export type Item = {
  __typename?: 'Item';
  /** Primary identifier */
  id: Scalars['ID'];
  /** Title */
  title: Scalars['String'];
  /** Short description */
  description?: Maybe<Scalars['String']>;
  /** Contents */
  content?: Maybe<Scalars['String']>;
  /** Keywords */
  keywords: Array<Scalars['String']>;
  /** Publication date in YYYY-MM-DD format */
  publishedOn: Scalars['String'];
};

/** Item to create */
export type CreateItemInput = {
  /** Title */
  title: Scalars['String'];
  /** Short description */
  description?: Maybe<Scalars['String']>;
  /** Contents */
  content?: Maybe<Scalars['String']>;
  /** Keywords */
  keywords?: Maybe<Array<Scalars['String']>>;
  /** Publication date in YYYY-MM-DD format */
  publishedOn?: Maybe<Scalars['String']>;
};

/** Fields to update on an item */
export type UpdateItemInput = {
  /** Title */
  title?: Maybe<Scalars['String']>;
  /** Short description */
  description?: Maybe<Scalars['String']>;
  /** Contents */
  content?: Maybe<Scalars['String']>;
  /** Keywords */
  keywords?: Maybe<Array<Scalars['String']>>;
  /** Publication date in YYYY-MM-DD format */
  publishedOn?: Maybe<Scalars['String']>;
};

/** Register a new user account */
export type RegisterUserInput = {
  /** Email address */
  email: Scalars['String'];
  /** Name */
  name: Scalars['String'];
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  /** Retrieve all items */
  items: Array<Item>;
  /** Retrieve an item by its ID */
  item?: Maybe<Item>;
  /** Retrieve all users */
  users: Array<User>;
  /** Retrieve a user by ID */
  user?: Maybe<User>;
};


/** Query root */
export type QueryItemsArgs = {
  q?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryItemArgs = {
  id: Scalars['ID'];
};


/** Query root */
export type QueryUsersArgs = {
  q?: Maybe<Scalars['String']>;
};


/** Query root */
export type QueryUserArgs = {
  id: Scalars['ID'];
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  /** Create a new item */
  createItem?: Maybe<Item>;
  /** Update an existing item */
  updateItem?: Maybe<Item>;
  /** Delete an item */
  deleteItem?: Maybe<Scalars['Boolean']>;
  /** Register (create) a new user */
  registerUser?: Maybe<User>;
};


/** Mutation root */
export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


/** Mutation root */
export type MutationUpdateItemArgs = {
  id: Scalars['ID'];
  input: UpdateItemInput;
};


/** Mutation root */
export type MutationDeleteItemArgs = {
  id: Scalars['ID'];
};


/** Mutation root */
export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Item: ResolverTypeWrapper<Item>;
  CreateItemInput: CreateItemInput;
  UpdateItemInput: UpdateItemInput;
  RegisterUserInput: RegisterUserInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  User: User;
  ID: Scalars['ID'];
  String: Scalars['String'];
  Item: Item;
  CreateItemInput: CreateItemInput;
  UpdateItemInput: UpdateItemInput;
  RegisterUserInput: RegisterUserInput;
  Query: {};
  Mutation: {};
  Boolean: Scalars['Boolean'];
}>;

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type ItemResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = ResolversObject<{
  id: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  content: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  keywords: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  publishedOn: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  items: Resolver<Array<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryItemsArgs, never>>;
  item: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<QueryItemArgs, 'id'>>;
  users: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
  user: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createItem: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<MutationCreateItemArgs, 'input'>>;
  updateItem: Resolver<Maybe<ResolversTypes['Item']>, ParentType, ContextType, RequireFields<MutationUpdateItemArgs, 'id' | 'input'>>;
  deleteItem: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteItemArgs, 'id'>>;
  registerUser: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterUserArgs, 'input'>>;
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  User: UserResolvers<ContextType>;
  Item: ItemResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
