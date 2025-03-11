<template>
  <v-app>
    <!-- Header -->
    <v-app-bar app color="primary" dark elevation="4">
      <v-container class="d-flex align-center py-0">
        <v-btn variant="text" to="/" class="px-0">
          <v-avatar size="36" class="me-2">
            <v-img
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              alt="Logo"
            ></v-img>
          </v-avatar>
          <span class="text-h6 font-weight-bold d-none d-sm-block"
            >ShopSmart</span
          >
        </v-btn>

        <v-spacer></v-spacer>

        <!-- Search Bar -->
        <v-slide-x-transition>
          <v-sheet
            rounded="pill"
            elevation="1"
            color="white"
            class="d-flex align-center px-2 mx-4 hidden-xs"
            max-width="400"
            width="100%"
          >
            <v-icon color="grey" class="ms-1">mdi-magnify</v-icon>
            <v-text-field
              v-model="headerSearch"
              density="compact"
              variant="plain"
              hide-details
              placeholder="Search products..."
              class="mx-2"
              @keyup.enter="applyHeaderSearch"
            >
              <template v-slot:append>
                <v-btn
                  icon="mdi-close"
                  size="small"
                  variant="text"
                  color="grey"
                  v-if="headerSearch"
                  @click="clearSearch"
                ></v-btn>
              </template>
            </v-text-field>
          </v-sheet>
        </v-slide-x-transition>

        <v-spacer></v-spacer>

        <!-- Filter Button -->
        <v-menu :close-on-content-click="false">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon>
              <v-icon>mdi-filter-variant</v-icon>
              <v-badge
                :content="filterCount"
                color="error"
                v-if="filterCount > 0"
                dot
                location="top end"
              ></v-badge>
            </v-btn>
          </template>
          <v-card min-width="300" class="pa-3">
            <v-card-title class="text-h6">Filters</v-card-title>
            <v-divider class="mb-3"></v-divider>
            <v-select
              v-model="selectedCategory"
              :items="categories"
              item-title="name"
              item-value="slug"
              label="Category"
              variant="outlined"
              density="comfortable"
              class="mb-3"
              @change="handleCategoryChange"
            ></v-select>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey-darken-1" variant="text" @click="resetFilters">
                Reset
              </v-btn>
              <v-btn color="primary" variant="tonal" @click="applyFilters">
                Apply
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>

        <!-- Mobile Search Toggle -->
        <v-btn
          icon
          class="d-sm-none"
          @click="mobileSearchVisible = !mobileSearchVisible"
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <!-- Mobile Search Overlay -->
    <v-expand-transition>
      <v-sheet
        v-if="mobileSearchVisible"
        class="d-sm-none pa-2"
        color="grey-lighten-4"
        width="100%"
      >
        <v-text-field
          v-model="headerSearch"
          density="compact"
          variant="outlined"
          hide-details
          placeholder="Search products..."
          prepend-inner-icon="mdi-magnify"
          append-inner-icon="mdi-close"
          @click:append-inner="mobileSearchVisible = false"
          @keyup.enter="handleSearch"
          autofocus
        ></v-text-field>
      </v-sheet>
    </v-expand-transition>

    <!-- Main Content -->
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1 class="text-h3 font-weight-bold mb-6 text-center">
              Trending Products
            </h1>

            <!-- Product Grid -->
            <v-row>
              <!-- Skeleton Loaders -->
              <template v-if="loading">
                <v-col
                  v-for="n in limit"
                  :key="n"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card class="h-100">
                    <v-skeleton-loader
                      type="image, heading, text"
                    ></v-skeleton-loader>
                  </v-card>
                </v-col>
              </template>

              <!-- Actual Product Listings -->
              <template v-else>
                <v-col
                  v-for="product in products"
                  :key="product.id"
                  cols="12"
                  sm="6"
                  md="4"
                  lg="3"
                >
                  <v-card class="h-100">
                    <v-img
                      :src="product.thumbnail"
                      :alt="product.title"
                      height="200"
                      cover
                    ></v-img>
                    <v-card-title class="text-h6">{{
                      product.title
                    }}</v-card-title>
                    <v-card-subtitle class="text-subtitle-1">
                      ${{ product.price }}
                    </v-card-subtitle>
                    <v-card-text class="text-body-2">
                      {{ product.description }}
                    </v-card-text>
                  </v-card>
                </v-col>
              </template>
            </v-row>

            <!-- Pagination -->
            <client-only>
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                class="mt-6"
                @update:modelValue="goToPage"
              ></v-pagination>
            </client-only>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Footer -->
    <v-footer class="py-3" color="grey-lighten-4" border>
      <v-container>
        <v-row align="center" justify="space-between">
          <v-col cols="12" sm="6" class="text-center text-sm-start">
            <span class="text-grey-darken-1"
              >© {{ new Date().getFullYear() }} ShopSmart. All rights
              reserved.</span
            >
          </v-col>
          <v-col cols="12" sm="6" class="text-center text-sm-end">
            <v-btn variant="text" color="primary" href="/terms" target="_blank"
              >Terms & Conditions</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
const route = useRoute();
const router = useRouter();

// Header state
const headerSearch = ref(route.query.search || "");
const mobileSearchVisible = ref(false);
const filterCount = computed(() => (selectedCategory.value ? 1 : 0));

// Reactive state
const searchQuery = ref(route.query.search || "");
const selectedCategory = ref(route.query.category || "");
const currentPage = ref(parseInt(route.query.page) || 1);
const limit = 16;
const products = ref([]);
const totalProducts = ref(0);
const categories = ref([]);
const loading = ref(false);

const applyHeaderSearch = () => {
  if (headerSearch.value.trim()) {
    searchQuery.value = headerSearch.value;
    handleSearch();
    mobileSearchVisible.value = false;
  }
};

const clearSearch = () => {
  headerSearch.value = "";
  searchQuery.value = "";
  handleSearch();
};

const resetFilters = () => {
  selectedCategory.value = "";
  handleCategoryChange();
};

const applyFilters = () => {
  handleCategoryChange();
};

const fetchCategories = async () => {
  const categoriesData = await $fetch("/api/categories");
  if (categoriesData) {
    categories.value = categoriesData;
  } else if (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const fetchProducts = async () => {
  loading.value = true;
  try {
    const { products: productsData, total } = await $fetch("/api/products", {
      query: {
        search: searchQuery.value,
        category: selectedCategory.value,
        skip: (currentPage.value - 1) * limit,
        limit,
      },
    });

    products.value = productsData || [];
    totalProducts.value = total || 0;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await fetchCategories();
  await fetchProducts();
});

watch(
  () => route.query,
  async (newQuery) => {
    searchQuery.value = newQuery.search || "";
    selectedCategory.value = newQuery.category || "";
    currentPage.value = parseInt(newQuery.page) || 1;
    await fetchProducts();
  },
  { immediate: true }
);

const handleSearch = () => {
  currentPage.value = 1;

  const query = {
    ...route.query,
    page: 1,
  };

  if (headerSearch.value.trim()) {
    query.search = headerSearch.value;
  } else {
    delete query.search;
  }

  router.push({ query });
};

const handleCategoryChange = () => {
  currentPage.value = 1;

  const query = {
    ...route.query,
    page: 1,
  };

  if (selectedCategory.value) {
    query.category = selectedCategory.value;
  } else {
    delete query.category;
  }

  router.push({ query });
};

const goToPage = (page) => {
  currentPage.value = page;
  const query = { ...route.query, page };

  if (!searchQuery.value.trim()) {
    delete query.search;
  }

  if (!selectedCategory.value) {
    delete query.category;
  }

  router.push({ query });
};

const totalPages = computed(() => Math.ceil(totalProducts.value / limit));
</script>

<style scoped>
.v-app-bar .v-container {
  height: 100%;
}
</style>
