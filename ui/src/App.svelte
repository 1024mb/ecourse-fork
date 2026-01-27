<script>
    import { Route, Router } from "svelte-routing";
    import { currentUser } from "./lib/pocketbase";
    import NotFound from "./routes/NotFound.svelte";
    import Login from "./routes/Login.svelte";
    import MyCourses from "./routes/MyCourses.svelte";
    import Lesson from "./routes/Lesson.svelte";
    import Search from "./components/Search.svelte";
    import Alert from "./components/Alert.svelte";
</script>

{#if $currentUser}
    <Search />
    <Alert />
{/if}

<Router>
    <Route component={MyCourses} path="/" />
    <Route component={Login} path="/login" />
    <Route component={Lesson} path="/:lessonTitle" />
    <Route component={NotFound} />
</Router>
