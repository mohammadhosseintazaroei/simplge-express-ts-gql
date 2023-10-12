import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { Categories, CategoriesModel } from "../models/categories.model";
import { CreateCategory } from "../dto/category.dto";

@Resolver()
export class CategoriesResolver {
  @Query((_returns) => Categories, { nullable: false })
  async getCategoryById(@Arg("id") id: string) {
    return await CategoriesModel.findById({ _id: id });
  }

  @Query(() => [Categories])
  async getAllCategories() {
    return await CategoriesModel.find();
  }

  @Mutation(() => Categories)
  async createCategory(
    @Arg("data") { name, description }: CreateCategory
  ): Promise<Categories> {
    const category = (
      await CategoriesModel.create({
        name,
        description,
      })
    ).save();
    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg("id") id: string) {
    await CategoriesModel.deleteOne({ _id: id });
    return true;
  }
}
