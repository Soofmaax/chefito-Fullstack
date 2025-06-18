import os
import requests
from supabase import create_client, Client

SUPABASE_URL = os.environ.get("SUPABASE_URL")
SUPABASE_SERVICE_ROLE_KEY = os.environ.get("SUPABASE_SERVICE_ROLE_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

MEALDB_API_URL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="


def fetch_meal(meal_id: str) -> dict:
    response = requests.get(f"{MEALDB_API_URL}{meal_id}")
    response.raise_for_status()
    data = response.json()
    if data.get("meals"):
        return data["meals"][0]
    return {}


def meal_to_recipe(meal: dict) -> dict:
    ingredients = []
    for i in range(1, 21):
        ing = meal.get(f"strIngredient{i}")
        measure = meal.get(f"strMeasure{i}")
        if ing:
            ingredients.append({"name": ing, "amount": measure})
    return {
        "id": meal.get("idMeal"),
        "title": {"en": meal.get("strMeal")},
        "description": {"en": meal.get("strInstructions") or ""},
        "ingredients": ingredients,
        "image_url": meal.get("strMealThumb"),
    }


def upsert_recipe(recipe: dict) -> None:
    supabase.table("recipes").upsert(recipe).execute()


def main():
    # Example meal IDs - replace with your own list
    meal_ids = ["52772", "52804"]
    for meal_id in meal_ids:
        meal = fetch_meal(meal_id)
        if meal:
            recipe = meal_to_recipe(meal)
            upsert_recipe(recipe)
            print(f"Imported recipe {meal_id}")


if __name__ == "__main__":
    main()

