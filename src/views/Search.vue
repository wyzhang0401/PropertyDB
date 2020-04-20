<template>
  <el-container class="app-main">
    <el-header>
      <!--element-ui的复合型输入框 可通过 slot 来指定在 input 中前置或者后置内容。 -->
      <el-input
        placeholder="physicochemical property name"
        v-model="inputContent"
        clearable
        @keyup.enter.native="Search"
        class="input-with-select"
      >
        <el-select
          v-model="nucleName"
          slot="prepend"
          clearable
          placeholder="nucleotides"
        >
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label"
          >
            <el-option
              v-for="item in group.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-option-group>
        </el-select>
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="Search"
        ></el-button>
      </el-input>
    </el-header>

    <el-main class="content">
      <!-- 折叠面板 -->
      <el-collapse v-model="activeNames">
        <el-collapse-item v-if="id === 1 || id === 10" title="MonoDNA" name="1">
          <!-- 对应表 monodna -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="2" :offset="10">MonoDNA</el-col>
              <el-col :span="1" v-if="id === 1"
                ><el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  type="info"
                  @click="export2excel"
                ></el-button
              ></el-col>
            </el-row>
          </div>

          <el-table
            id="myTable1"
            :data="monodna"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ReferID"
              label="ReferID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="PubMedID"
              label="PubMedID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="Description"
              label="Description"
              width="200"
            ></el-table-column>
            <el-table-column prop="A" label="A"></el-table-column>
            <el-table-column prop="C" label="C"></el-table-column>
            <el-table-column prop="G" label="G"></el-table-column>
            <el-table-column prop="T" label="T"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 2 || id === 10"
          title="DiDNA(Pse-in-One)"
          name="2"
        >
          <!-- 对应表 didna-pse-in-one -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">DiDNA(Pse-in-One)</el-col>
              <el-col :span="1" v-if="id === 2"
                ><el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  type="info"
                  @click="export2excel"
                ></el-button
              ></el-col>
            </el-row>
          </div>

          <el-table
            id="myTable2"
            :data="didnapseinone"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ReferID"
              label="ReferID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="PubMedID"
              label="PubMedID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="Description"
              label="Description"
              width="200"
            ></el-table-column>
            <el-table-column prop="AA" label="AA"></el-table-column>
            <el-table-column prop="AG" label="AG"></el-table-column>
            <el-table-column prop="AC" label="AC"></el-table-column>
            <el-table-column prop="AT" label="AT"></el-table-column>

            <el-table-column prop="GA" label="GA"></el-table-column>
            <el-table-column prop="GG" label="GG"></el-table-column>
            <el-table-column prop="GC" label="GC"></el-table-column>
            <el-table-column prop="GT" label="GT"></el-table-column>

            <el-table-column prop="CA" label="CA"></el-table-column>
            <el-table-column prop="CG" label="CG"></el-table-column>
            <el-table-column prop="CC" label="CC"></el-table-column>
            <el-table-column prop="CT" label="CT"></el-table-column>

            <el-table-column prop="TA" label="TA"></el-table-column>
            <el-table-column prop="TG" label="TG"></el-table-column>
            <el-table-column prop="TC" label="TC"></el-table-column>
            <el-table-column prop="TT" label="TT"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 3 || id === 10"
          title="DiDNA(UltraPse)"
          name="3"
        >
          <!-- 对应表 didna-ultrapse -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">DiDNA(UltraPse)</el-col>
              <el-col :span="1" v-if="id === 3"
                ><el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  type="info"
                  @click="export2excel"
                ></el-button
              ></el-col>
            </el-row>
          </div>

          <el-table
            id="myTable3"
            :data="didnaultra"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ReferID"
              label="ReferID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="PubMedID"
              label="PubMedID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="Description"
              label="Description"
              width="200"
            ></el-table-column>
            <el-table-column prop="AA" label="AA"></el-table-column>
            <el-table-column prop="AG" label="AG"></el-table-column>
            <el-table-column prop="AC" label="AC"></el-table-column>
            <el-table-column prop="AT" label="AT"></el-table-column>

            <el-table-column prop="GA" label="GA"></el-table-column>
            <el-table-column prop="GG" label="GG"></el-table-column>
            <el-table-column prop="GC" label="GC"></el-table-column>
            <el-table-column prop="GT" label="GT"></el-table-column>

            <el-table-column prop="CA" label="CA"></el-table-column>
            <el-table-column prop="CG" label="CG"></el-table-column>
            <el-table-column prop="CC" label="CC"></el-table-column>
            <el-table-column prop="CT" label="CT"></el-table-column>

            <el-table-column prop="TA" label="TA"></el-table-column>
            <el-table-column prop="TG" label="TG"></el-table-column>
            <el-table-column prop="TC" label="TC"></el-table-column>
            <el-table-column prop="TT" label="TT"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 4 || id === 10"
          title="DiDNA(VisFeature)"
          name="4"
        >
          <!-- 对应表 didna-visfeature -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">DiDNA(VisFeature)</el-col>
              <el-col :span="1" v-if="id === 4"
                ><el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  type="info"
                  @click="export2excel"
                ></el-button
              ></el-col>
            </el-row>
          </div>

          <el-table
            id="myTable4"
            :data="didnavis"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ReferID"
              label="ReferID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="PubMedID"
              label="PubMedID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="Description"
              label="Description"
              width="200"
            ></el-table-column>
            <el-table-column prop="AA" label="AA"></el-table-column>
            <el-table-column prop="AG" label="AG"></el-table-column>
            <el-table-column prop="AC" label="AC"></el-table-column>
            <el-table-column prop="AT" label="AT"></el-table-column>

            <el-table-column prop="GA" label="GA"></el-table-column>
            <el-table-column prop="GG" label="GG"></el-table-column>
            <el-table-column prop="GC" label="GC"></el-table-column>
            <el-table-column prop="GT" label="GT"></el-table-column>

            <el-table-column prop="CA" label="CA"></el-table-column>
            <el-table-column prop="CG" label="CG"></el-table-column>
            <el-table-column prop="CC" label="CC"></el-table-column>
            <el-table-column prop="CT" label="CT"></el-table-column>

            <el-table-column prop="TA" label="TA"></el-table-column>
            <el-table-column prop="TG" label="TG"></el-table-column>
            <el-table-column prop="TC" label="TC"></el-table-column>
            <el-table-column prop="TT" label="TT"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 5 || id === 10"
          title="DiRNA(Pse-in-One)"
          name="5"
        >
          <!-- 对应表 dirna-pse-in-one -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">DiRNA(Pse-in-One)</el-col>
              <el-col :span="1" v-if="id === 5"
                ><el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  type="info"
                  @click="export2excel"
                ></el-button
              ></el-col>
            </el-row>
          </div>

          <el-table
            id="myTable5"
            :data="dirnapseinone"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ReferID"
              label="ReferID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="PubMedID"
              label="PubMedID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="Description"
              label="Description"
              width="200"
            ></el-table-column>
            <el-table-column prop="AA" label="AA"></el-table-column>
            <el-table-column prop="AG" label="AG"></el-table-column>
            <el-table-column prop="AC" label="AC"></el-table-column>
            <el-table-column prop="AU" label="AU"></el-table-column>

            <el-table-column prop="GA" label="GA"></el-table-column>
            <el-table-column prop="GG" label="GG"></el-table-column>
            <el-table-column prop="GC" label="GC"></el-table-column>
            <el-table-column prop="GU" label="GU"></el-table-column>

            <el-table-column prop="CA" label="CA"></el-table-column>
            <el-table-column prop="CG" label="CG"></el-table-column>
            <el-table-column prop="CC" label="CC"></el-table-column>
            <el-table-column prop="CU" label="CU"></el-table-column>

            <el-table-column prop="UA" label="UA"></el-table-column>
            <el-table-column prop="UG" label="UG"></el-table-column>
            <el-table-column prop="UC" label="UC"></el-table-column>
            <el-table-column prop="UU" label="UU"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 6 || id === 10"
          title="DiRNA(UltraPse)"
          name="6"
        >
          <!-- 对应表 dirna-ultrapse -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">DiRNA(UltraPse)</el-col>
              <el-col :span="1" v-if="id === 6"
                ><el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  type="info"
                  @click="export2excel"
                ></el-button
              ></el-col>
            </el-row>
          </div>

          <el-table
            id="myTable6"
            :data="dirnaultra"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ReferID"
              label="ReferID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="PubMedID"
              label="PubMedID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="Description"
              label="Description"
              width="200"
            ></el-table-column>
            <el-table-column prop="AA" label="AA"></el-table-column>
            <el-table-column prop="AG" label="AG"></el-table-column>
            <el-table-column prop="AC" label="AC"></el-table-column>
            <el-table-column prop="AU" label="AU"></el-table-column>

            <el-table-column prop="GA" label="GA"></el-table-column>
            <el-table-column prop="GG" label="GG"></el-table-column>
            <el-table-column prop="GC" label="GC"></el-table-column>
            <el-table-column prop="GU" label="GU"></el-table-column>

            <el-table-column prop="CA" label="CA"></el-table-column>
            <el-table-column prop="CG" label="CG"></el-table-column>
            <el-table-column prop="CC" label="CC"></el-table-column>
            <el-table-column prop="CU" label="CU"></el-table-column>

            <el-table-column prop="UA" label="UA"></el-table-column>
            <el-table-column prop="UG" label="UG"></el-table-column>
            <el-table-column prop="UC" label="UC"></el-table-column>
            <el-table-column prop="UU" label="UU"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 7 || id === 10"
          title="DiRNA(VisFeature)"
          name="7"
        >
          <!-- 对应表 dirna-visfeature -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">DiRNA(VisFeature)</el-col>
              <el-col :span="1" v-if="id === 7"
                ><el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  type="info"
                  @click="export2excel"
                ></el-button
              ></el-col>
            </el-row>
          </div>

          <el-table
            id="myTable7"
            :data="dirnavis"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ReferID"
              label="ReferID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="PubMedID"
              label="PubMedID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="Description"
              label="Description"
              width="200"
            ></el-table-column>
            <el-table-column prop="AA" label="AA"></el-table-column>
            <el-table-column prop="AG" label="AG"></el-table-column>
            <el-table-column prop="AC" label="AC"></el-table-column>
            <el-table-column prop="AU" label="AU"></el-table-column>

            <el-table-column prop="GA" label="GA"></el-table-column>
            <el-table-column prop="GG" label="GG"></el-table-column>
            <el-table-column prop="GC" label="GC"></el-table-column>
            <el-table-column prop="GU" label="GU"></el-table-column>

            <el-table-column prop="CA" label="CA"></el-table-column>
            <el-table-column prop="CG" label="CG"></el-table-column>
            <el-table-column prop="CC" label="CC"></el-table-column>
            <el-table-column prop="CU" label="CU"></el-table-column>

            <el-table-column prop="UA" label="UA"></el-table-column>
            <el-table-column prop="UG" label="UG"></el-table-column>
            <el-table-column prop="UC" label="UC"></el-table-column>
            <el-table-column prop="UU" label="UU"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 8 || id === 10"
          title="TriDNA(UltraPse)"
          name="8"
        >
          <!-- 对应表 tridna-ultrapse -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">TriDNA(UltraPse)</el-col>
              <el-col :span="1" v-if="id === 8"
                ><el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  type="info"
                  @click="export2excel"
                ></el-button
              ></el-col>
            </el-row>
          </div>

          <el-table
            id="myTable8"
            :data="tridnaultra"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ReferID"
              label="ReferID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="PubMedID"
              label="PubMedID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="Description"
              label="Description"
              width="200"
            ></el-table-column>
            <el-table-column prop="AAA" label="AAA"></el-table-column>
            <el-table-column prop="AAG" label="AAG"></el-table-column>
            <el-table-column prop="AAC" label="AAC"></el-table-column>
            <el-table-column prop="AAT" label="AAT"></el-table-column>
            <el-table-column prop="AGA" label="AGA"></el-table-column>
            <el-table-column prop="AGG" label="AGG"></el-table-column>
            <el-table-column prop="AGC" label="AGC"></el-table-column>
            <el-table-column prop="AGT" label="AGT"></el-table-column>
            <el-table-column prop="ACA" label="ACA"></el-table-column>
            <el-table-column prop="ACG" label="ACG"></el-table-column>
            <el-table-column prop="ACC" label="ACC"></el-table-column>
            <el-table-column prop="ACT" label="ACT"></el-table-column>
            <el-table-column prop="ATA" label="ATA"></el-table-column>
            <el-table-column prop="ATG" label="ATG"></el-table-column>
            <el-table-column prop="ATC" label="ATC"></el-table-column>
            <el-table-column prop="ATT" label="ATT"></el-table-column>

            <el-table-column prop="GAA" label="GAA"></el-table-column>
            <el-table-column prop="GAG" label="GAG"></el-table-column>
            <el-table-column prop="GAC" label="GAC"></el-table-column>
            <el-table-column prop="GAT" label="GAT"></el-table-column>
            <el-table-column prop="GGA" label="GGA"></el-table-column>
            <el-table-column prop="GGG" label="GGG"></el-table-column>
            <el-table-column prop="GGC" label="GGC"></el-table-column>
            <el-table-column prop="GGT" label="GGT"></el-table-column>
            <el-table-column prop="GCA" label="GCA"></el-table-column>
            <el-table-column prop="GCG" label="GCG"></el-table-column>
            <el-table-column prop="GCC" label="GCC"></el-table-column>
            <el-table-column prop="GCT" label="GCT"></el-table-column>
            <el-table-column prop="GTA" label="GTA"></el-table-column>
            <el-table-column prop="GTG" label="GTG"></el-table-column>
            <el-table-column prop="GTC" label="GTC"></el-table-column>
            <el-table-column prop="GTT" label="GTT"></el-table-column>

            <el-table-column prop="CAA" label="CAA"></el-table-column>
            <el-table-column prop="CAG" label="CAG"></el-table-column>
            <el-table-column prop="CAC" label="CAC"></el-table-column>
            <el-table-column prop="CAT" label="CAT"></el-table-column>
            <el-table-column prop="CGA" label="CGA"></el-table-column>
            <el-table-column prop="CGG" label="CGG"></el-table-column>
            <el-table-column prop="CGC" label="CGC"></el-table-column>
            <el-table-column prop="CGT" label="CGT"></el-table-column>
            <el-table-column prop="CCA" label="CCA"></el-table-column>
            <el-table-column prop="CCG" label="CCG"></el-table-column>
            <el-table-column prop="CCC" label="CCC"></el-table-column>
            <el-table-column prop="CCT" label="CCT"></el-table-column>
            <el-table-column prop="CTA" label="CTA"></el-table-column>
            <el-table-column prop="CTG" label="CTG"></el-table-column>
            <el-table-column prop="CTC" label="CTC"></el-table-column>
            <el-table-column prop="CTT" label="CTT"></el-table-column>

            <el-table-column prop="TAA" label="TAA"></el-table-column>
            <el-table-column prop="TAG" label="TAG"></el-table-column>
            <el-table-column prop="TAC" label="TAC"></el-table-column>
            <el-table-column prop="TAT" label="TAT"></el-table-column>
            <el-table-column prop="TGA" label="TGA"></el-table-column>
            <el-table-column prop="TGG" label="TGG"></el-table-column>
            <el-table-column prop="TGC" label="TGC"></el-table-column>
            <el-table-column prop="TGT" label="TGT"></el-table-column>
            <el-table-column prop="TCA" label="TCA"></el-table-column>
            <el-table-column prop="TCG" label="TCG"></el-table-column>
            <el-table-column prop="TCC" label="TCC"></el-table-column>
            <el-table-column prop="TCT" label="TCT"></el-table-column>
            <el-table-column prop="TTA" label="TTA"></el-table-column>
            <el-table-column prop="TTG" label="TTG"></el-table-column>
            <el-table-column prop="TTC" label="TTC"></el-table-column>
            <el-table-column prop="TTT" label="TTT"></el-table-column>
          </el-table>
        </el-collapse-item>

        <el-collapse-item
          v-if="id === 9 || id === 10"
          title="TriDNA(VisFeature)"
          name="9"
        >
          <!-- 对应表 tridna-visfeature -->
          <div class="tabletitle">
            <el-row>
              <el-col :span="4" :offset="10">TriDNA(VisFeature)</el-col>
              <el-col :span="1" v-if="id === 9"
                ><el-button
                  icon="el-icon-download"
                  circle
                  size="mini"
                  type="info"
                  @click="export2excel"
                ></el-button
              ></el-col>
            </el-row>
          </div>

          <el-table
            id="myTable9"
            :data="tridnavis"
            :row-class-name="tabRowClassName"
            empty-text="cannot find"
            border
            style="width: 100%"
          >
            <el-table-column prop="ID" label="ID" width="80"></el-table-column>
            <el-table-column
              prop="PropertyName"
              label="PropertyName"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="ReferID"
              label="ReferID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="PubMedID"
              label="PubMedID"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="Description"
              label="Description"
              width="200"
            ></el-table-column>
            <el-table-column prop="AAA" label="AAA"></el-table-column>
            <el-table-column prop="AAG" label="AAG"></el-table-column>
            <el-table-column prop="AAC" label="AAC"></el-table-column>
            <el-table-column prop="AAT" label="AAT"></el-table-column>
            <el-table-column prop="AGA" label="AGA"></el-table-column>
            <el-table-column prop="AGG" label="AGG"></el-table-column>
            <el-table-column prop="AGC" label="AGC"></el-table-column>
            <el-table-column prop="AGT" label="AGT"></el-table-column>
            <el-table-column prop="ACA" label="ACA"></el-table-column>
            <el-table-column prop="ACG" label="ACG"></el-table-column>
            <el-table-column prop="ACC" label="ACC"></el-table-column>
            <el-table-column prop="ACT" label="ACT"></el-table-column>
            <el-table-column prop="ATA" label="ATA"></el-table-column>
            <el-table-column prop="ATG" label="ATG"></el-table-column>
            <el-table-column prop="ATC" label="ATC"></el-table-column>
            <el-table-column prop="ATT" label="ATT"></el-table-column>

            <el-table-column prop="GAA" label="GAA"></el-table-column>
            <el-table-column prop="GAG" label="GAG"></el-table-column>
            <el-table-column prop="GAC" label="GAC"></el-table-column>
            <el-table-column prop="GAT" label="GAT"></el-table-column>
            <el-table-column prop="GGA" label="GGA"></el-table-column>
            <el-table-column prop="GGG" label="GGG"></el-table-column>
            <el-table-column prop="GGC" label="GGC"></el-table-column>
            <el-table-column prop="GGT" label="GGT"></el-table-column>
            <el-table-column prop="GCA" label="GCA"></el-table-column>
            <el-table-column prop="GCG" label="GCG"></el-table-column>
            <el-table-column prop="GCC" label="GCC"></el-table-column>
            <el-table-column prop="GCT" label="GCT"></el-table-column>
            <el-table-column prop="GTA" label="GTA"></el-table-column>
            <el-table-column prop="GTG" label="GTG"></el-table-column>
            <el-table-column prop="GTC" label="GTC"></el-table-column>
            <el-table-column prop="GTT" label="GTT"></el-table-column>

            <el-table-column prop="CAA" label="CAA"></el-table-column>
            <el-table-column prop="CAG" label="CAG"></el-table-column>
            <el-table-column prop="CAC" label="CAC"></el-table-column>
            <el-table-column prop="CAT" label="CAT"></el-table-column>
            <el-table-column prop="CGA" label="CGA"></el-table-column>
            <el-table-column prop="CGG" label="CGG"></el-table-column>
            <el-table-column prop="CGC" label="CGC"></el-table-column>
            <el-table-column prop="CGT" label="CGT"></el-table-column>
            <el-table-column prop="CCA" label="CCA"></el-table-column>
            <el-table-column prop="CCG" label="CCG"></el-table-column>
            <el-table-column prop="CCC" label="CCC"></el-table-column>
            <el-table-column prop="CCT" label="CCT"></el-table-column>
            <el-table-column prop="CTA" label="CTA"></el-table-column>
            <el-table-column prop="CTG" label="CTG"></el-table-column>
            <el-table-column prop="CTC" label="CTC"></el-table-column>
            <el-table-column prop="CTT" label="CTT"></el-table-column>

            <el-table-column prop="TAA" label="TAA"></el-table-column>
            <el-table-column prop="TAG" label="TAG"></el-table-column>
            <el-table-column prop="TAC" label="TAC"></el-table-column>
            <el-table-column prop="TAT" label="TAT"></el-table-column>
            <el-table-column prop="TGA" label="TGA"></el-table-column>
            <el-table-column prop="TGG" label="TGG"></el-table-column>
            <el-table-column prop="TGC" label="TGC"></el-table-column>
            <el-table-column prop="TGT" label="TGT"></el-table-column>
            <el-table-column prop="TCA" label="TCA"></el-table-column>
            <el-table-column prop="TCG" label="TCG"></el-table-column>
            <el-table-column prop="TCC" label="TCC"></el-table-column>
            <el-table-column prop="TCT" label="TCT"></el-table-column>
            <el-table-column prop="TTA" label="TTA"></el-table-column>
            <el-table-column prop="TTG" label="TTG"></el-table-column>
            <el-table-column prop="TTC" label="TTC"></el-table-column>
            <el-table-column prop="TTT" label="TTT"></el-table-column>
          </el-table>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  data() {
    return {
      // messg: ["","","","","","","","",""], // 出现错误，不能及时渲染到页面
      monodna: "",
      didnapseinone: "",
      didnaultra: "",
      didnavis: "",
      dirnapseinone: "",
      dirnaultra: "",
      dirnavis: "",
      tridnaultra: "",
      tridnavis: "",
      id: 0,
      activeNames: [],
      options: [
        {
          label: "MonoDNA",
          options: [
            {
              value: "option1",
              label: "MonoDNA"
            }
          ]
        },
        {
          label: "DiDNA",
          options: [
            {
              value: "option2",
              label: "DiDNA(Pse-in-One)"
            },
            {
              value: "option3",
              label: "DiDNA(UltraPse)"
            },
            {
              value: "option4",
              label: "DiDNA(VisFeature)"
            }
          ]
        },
        {
          label: "DiRNA",
          options: [
            {
              value: "option5",
              label: "DiRNA(Pse-in-One)"
            },
            {
              value: "option6",
              label: "DiRNA(UltraPse)"
            },
            {
              value: "option7",
              label: "DiRNA(VisFeature)"
            }
          ]
        },
        {
          label: "TriDNA",
          options: [
            {
              value: "option8",
              label: "TriDNA(UltraPse)"
            },
            {
              value: "option9",
              label: "TriDNA(VisFeature)"
            }
          ]
        }
      ],
      nucleName: "",
      inputContent: ""
    };
  },
  methods: {
    // 表格显示具有斑马线
    // eslint-disable-next-line no-unused-vars
    tabRowClassName({ row, rowIndex }) {
      var index = rowIndex + 1;
      if (index % 2 == 0) {
        return "warning-row";
      }
    },

    // 导出表格
    export2excel() {
      let id = this.id;
      let myTable = "#myTable";
      let fileName = ".xlsx";
      let file = [
        "monodna",
        "didna-pse-in-one",
        "didna-ultrapse",
        "didna-visfeature",
        "dirna-pse-in-one",
        "dirna-ultrapse",
        "dirna-visfeature",
        "tridna-ultrapse",
        "tridna-visfeature"
      ];
      myTable = myTable + String(id);
      fileName = file[id - 1] + fileName;
      // if(id == 1){
      //   myTable = myTable + "1"
      //   fileName = "monodna"+fileName
      // }
      // else if(id == 2){
      //   myTable = myTable + "2"
      //   fileName = "didna-pse-in-one"+fileName
      // }
      // else if(id == 3){
      //   myTable = myTable + "3"
      //   fileName = "didna-ultrapse"+fileName
      // }
      // console.log(myTable)
      let et = XLSX.utils.table_to_book(document.querySelector(myTable));
      let etout = XLSX.write(et, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          new Blob([etout], { type: "application/octet-stream" }),
          fileName
        );
      } catch (e) {
        console.log(e, etout);
      }
      return etout;
    },

    Search() {
      // 将输入的理化性质大写均转为小写(但是sql好像不区分大小写)
      var propertyName = this.inputContent.toLowerCase();
      // 选择框内容
      var nucleName = this.nucleName;
      var _this = this;
      // 选择框和搜索框都没有内容,在页面中显示所有表中的数据内容
      if (nucleName == "" && propertyName == "") {
        _this.activeNames = [];
        axios.post("/api/property/mono").then(function(respond) {
          _this.monodna = respond.data;
        });
        axios.post("/api/property/didnapseinone").then(function(respond) {
          _this.didnapseinone = respond.data;
        });
        axios.post("/api/property/didnaultrapse").then(function(respond) {
          _this.didnaultra = respond.data;
        });
        axios.post("/api/property/didnavisfeature").then(function(respond) {
          _this.didnavis = respond.data;
        });
        axios.post("/api/property/dirnapseinone").then(function(respond) {
          _this.dirnapseinone = respond.data;
        });
        axios.post("/api/property/dirnaultrapse").then(function(respond) {
          _this.dirnaultra = respond.data;
        });
        axios.post("/api/property/dirnavisfeature").then(function(respond) {
          _this.dirnavis = respond.data;
        });
        axios.post("/api/property/tridnaultrapse").then(function(respond) {
          _this.tridnaultra = respond.data;
        });
        axios.post("/api/property/tridnavisfeature").then(function(respond) {
          _this.tridnavis = respond.data;
          _this.id = 10;
        });
      }
      // 选择框为option1(MonoDNA)
      else if (nucleName == "option1") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/mono").then(function(respond) {
            console.log(respond);
            _this.monodna = respond.data;
            // console.log(respond.data[0].PropertyName)
            _this.id = 1;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchmono", { propertyName })
            .then(respond => {
              _this.id = 1;
              _this.monodna = respond.data;
            });
        }
      }
      // 选择框为option2(DiDNA(Pse-in-One))
      else if (nucleName == "option2") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/didnapseinone").then(function(respond) {
            // console.log(respond)
            _this.didnapseinone = respond.data;
            _this.id = 2;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdidnapseinone", { propertyName })
            .then(function(respond) {
              _this.id = 2;
              _this.didnapseinone = respond.data;
            });
        }
      }
      // 选择框为option3(DiDNA(Ultrapse))
      else if (nucleName == "option3") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/didnaultrapse").then(function(respond) {
            // console.log(respond)
            _this.didnaultra = respond.data;
            _this.id = 3;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdidnaultrapse", { propertyName })
            .then(function(respond) {
              _this.id = 3;
              _this.didnaultra = respond.data;
            });
        }
      }
      // 选择框为option4(DiDNA(Visfeature))
      else if (nucleName == "option4") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/didnavisfeature").then(function(respond) {
            // console.log(respond)
            _this.didnavis = respond.data;
            _this.id = 4;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdidnavisfeature", { propertyName })
            .then(function(respond) {
              _this.id = 4;
              _this.didnavis = respond.data;
            });
        }
      }

      // 选择框为option5(DiRNA(Pse-in-One))
      else if (nucleName == "option5") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/dirnapseinone").then(function(respond) {
            // console.log(respond)
            _this.dirnapseinone = respond.data;
            _this.id = 5;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdirnapseinone", { propertyName })
            .then(function(respond) {
              _this.id = 5;
              _this.dirnapseinone = respond.data;
            });
        }
      }
      // 选择框为option6(DiRNA(Ultrapse))
      else if (nucleName == "option6") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/dirnaultrapse").then(function(respond) {
            // console.log(respond)
            _this.dirnaultra = respond.data;
            _this.id = 6;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdirnaultrapse", { propertyName })
            .then(function(respond) {
              _this.id = 6;
              _this.dirnaultra = respond.data;
            });
        }
      }
      // 选择框为option7(DiRNA(Visfeature))
      else if (nucleName == "option7") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/dirnavisfeature").then(function(respond) {
            // console.log(respond)
            _this.dirnavis = respond.data;
            _this.id = 7;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchdirnavisfeature", { propertyName })
            .then(function(respond) {
              _this.id = 7;
              _this.dirnavis = respond.data;
            });
        }
      }

      // 选择框为option8(TriDNA(UltraPse))
      else if (nucleName == "option8") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/tridnaultrapse").then(function(respond) {
            // console.log(respond)
            _this.tridnaultra = respond.data;
            _this.id = 8;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchtridnaultrapse", { propertyName })
            .then(function(respond) {
              _this.id = 8;
              _this.tridnaultra = respond.data;
            });
        }
      }

      // 选择框为option9(TriDNA(VisFeature))
      else if (nucleName == "option9") {
        //  且 搜索框为空
        if (propertyName == "") {
          axios.post("/api/property/tridnavisfeature").then(function(respond) {
            // console.log(respond)
            _this.tridnavis = respond.data;
            _this.id = 9;
          });
        }
        //  且 搜索框不空
        else {
          axios
            .post("/api/property/searchtridnavisfeature", { propertyName })
            .then(function(respond) {
              _this.id = 9;
              _this.tridnavis = respond.data;
            });
        }
      }
      // 选择框空，搜索框不空，从整个数据库搜索。。。考虑如何实现
      else if (nucleName == "" && propertyName != "") {
        axios
          .post("/api/property/searchmono", { propertyName })
          .then(function(respond) {
            _this.monodna = respond.data;
          });
        axios
          .post("/api/property/searchdidnapseinone", { propertyName })
          .then(function(respond) {
            _this.didnapseinone = respond.data;
          });
        axios
          .post("/api/property/searchdidnaultrapse", { propertyName })
          .then(function(respond) {
            _this.didnaultra = respond.data;
          });
        axios
          .post("/api/property/searchdidnavisfeature", { propertyName })
          .then(function(respond) {
            _this.didnavis = respond.data;
          });
        axios
          .post("/api/property/searchdirnapseinone", { propertyName })
          .then(function(respond) {
            _this.dirnapseinone = respond.data;
          });
        axios
          .post("/api/property/searchdirnaultrapse", { propertyName })
          .then(function(respond) {
            _this.dirnaultra = respond.data;
          });
        axios
          .post("/api/property/searchdirnavisfeature", { propertyName })
          .then(function(respond) {
            _this.dirnavis = respond.data;
          });
        axios
          .post("/api/property/searchtridnaultrapse", { propertyName })
          .then(function(respond) {
            _this.tridnaultra = respond.data;
          });
        axios
          .post("/api/property/searchtridnavisfeature", { propertyName })
          .then(function(respond) {
            _this.tridnavis = respond.data;
            _this.id = 10;
          });
      }
    }
  }
};
</script>

<style>
.input-with-select {
  width: 600px;
}
.el-select {
  width: 120px;
}
.el-table .warning-row {
  background: #d8d8d8;
}
.tabletitle {
  text-align: center;
  background-color: #99cccc;
  height: 30px;
  line-height: 30px;
  color: #686868;
  font-weight: bold;
}
</style>
