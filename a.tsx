"use client";
import React from "react";
import { Can } from "@casl/react";
import { Ability, AbilityBuilder } from "@casl/ability";

interface User {
  id: number;
  role: string;
}

interface Article {
  id: number;
  title: string;
  authorId: number;
  published: boolean;
}

type Actions = 'create' | 'read' | 'update' | 'delete' | 'manage';
type Subjects = 'Article' | 'User' | 'all';

type AppAbility = Ability<[Actions, Subjects]>;

const defineAbilitiesFor = (user: User) => {
  const { can, cannot, build } = new AbilityBuilder(Ability as any);

  if (user.role === 'admin') {
    can('manage', 'all');
  } else if (user.role === 'editor') {
    can(['create', 'read', 'update'], 'Article');
    cannot('delete', 'Article');
  } else {
    can('read', 'Article', { published: true });
  }

  return build() as AppAbility;
};

interface ArticleProps {
  article: Article;
}

const ArticleComponent: React.FC<ArticleProps> = ({ article }) => {
  const user: User = { id: 1, role: 'abc' };
  const ability = defineAbilitiesFor(user);

  return (
    <div>
    <h3>{"Hello"}</h3>
    {ability.can("update", "Article") && <button>Edit</button>}
    {ability.can("delete", "Article") && <button>Delete</button>}
  </div>
  );
};

export default ArticleComponent;